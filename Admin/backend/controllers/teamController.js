const Team = require('../models/Team');
const XLSX = require('xlsx');
const axios = require('axios');


const registerTeamOnAllLevels = async (team) => {

  const levelBackendUrls = [
    process.env.LEVEL0_API,
    process.env.LEVEL1_API,
    process.env.LEVEL2_API,
    process.env.LEVEL3_API,
    process.env.LEVEL4_API,
    process.env.LEVEL5_API
  ];

  const validUrls = levelBackendUrls.filter(Boolean);

  if (validUrls.length === 0) {
    return [];
  }

  const results = await Promise.allSettled(

    validUrls.map(async (baseUrl) => {

      const response = await axios.post(
        `${baseUrl}/api/teams/register`,
        team,
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        url: baseUrl,
        success: true,
        data: response.data
      };

    })

  );


  return results.map((result, index) => {

    if (result.status === 'fulfilled') {
      return result.value;
    }

    return {
      url: validUrls[index],
      success: false,
      error:
        result.reason?.response?.data?.error ||
        result.reason?.response?.data?.message ||
        result.reason?.message ||
        'Unknown error'
    };

  });

};


/*
 * SINGLE TEAM REGISTRATION
 *
 * Flow:
 *
 * Frontend
 *    ↓
 * Admin MongoDB
 *    ↓
 * Level 0
 * Level 1
 * Level 2
 * Level 3
 * Level 4
 * Level 5
 */
const registerTeam = async (req, res) => {

  try {

    const {
      teamId,
      teamName,
      teamSize,
      members
    } = req.body;


    if (
      !teamId ||
      !teamName ||
      !teamSize ||
      !members
    ) {

      return res.status(400).json({
        success: false,
        error:
          'All fields (teamId, teamName, teamSize, members) are required.'
      });

    }


    if (!Array.isArray(members)) {

      return res.status(400).json({
        success: false,
        error:
          'members must be an array.'
      });

    }


    const numericTeamSize =
      Number(teamSize);


    if (
      !Number.isInteger(numericTeamSize) ||
      numericTeamSize < 1
    ) {

      return res.status(400).json({
        success: false,
        error:
          'teamSize must be a positive integer.'
      });

    }


    if (
      members.length !== numericTeamSize
    ) {

      return res.status(400).json({
        success: false,
        error:
          `Team size is ${numericTeamSize}, but ${members.length} member(s) were provided.`
      });

    }


    /*
     * Only Team ID must be unique.
     * Duplicate Team Names are allowed.
     */
    const existingTeam =
      await Team.findOne({
        teamId:
          teamId.trim()
      });


    if (existingTeam) {

      return res.status(400).json({
        success: false,
        error:
          'Team ID already exists.'
      });

    }


    /*
     * Create standard team JSON object
     */
    const teamData = {

      teamId:
        teamId.trim(),

      teamName:
        teamName.trim(),

      teamSize:
        numericTeamSize,

      members

    };


    /*
     * Register in Admin MongoDB
     */
    const newTeam =
      await Team.create(
        teamData
      );


    /*
     * Register same team
     * on all six level backends
     */
    const levelRegistrations =
      await registerTeamOnAllLevels(
        teamData
      );


    const failedLevelRegistrations =
      levelRegistrations.filter(
        level =>
          !level.success
      );


    return res.status(201).json({

      success: true,

      message:
        'Team registered successfully.',

      team:
        newTeam,

      levelRegistrationComplete:
        failedLevelRegistrations.length === 0,

      levelRegistrations,

      failedLevelRegistrations

    });


  } catch (error) {

    console.error(
      '[Team Registration Error]:',
      error
    );


    return res.status(500).json({

      success: false,

      error:
        'Internal server error during team registration.'

    });

  }

};


/*
 * GET SINGLE TEAM
 */
const getTeamDetails = async (req, res) => {

  try {

    const {
      teamId
    } = req.params;


    const team =
      await Team.findOne({
        teamId
      });


    if (!team) {

      return res.status(404).json({

        success: false,

        error:
          'Team not found with this Team ID.'

      });

    }


    return res.status(200).json({

      success: true,

      team

    });


  } catch (error) {

    console.error(
      '[Fetch Team Error]:',
      error
    );


    return res.status(500).json({

      success: false,

      error:
        'Internal server error while fetching team details.'

    });

  }

};


/*
 * GET ALL TEAMS
 */
const getAllTeams = async (req, res) => {

  try {

    const teams =
      await Team.find()
        .sort({
          createdAt: 1
        })
        .lean();


    return res.status(200).json({

      success: true,

      count:
        teams.length,

      teams

    });


  } catch (error) {

    console.error(
      '[Fetch All Teams Error]:',
      error
    );


    return res.status(500).json({

      success: false,

      error:
        'Internal server error while fetching teams.'

    });

  }

};


/*
 * EXCEL TEAM REGISTRATION
 *
 * Excel format:
 *
 * teamId | teamName | teamSize | name | email |
 * rollNo | mobileNo | course | year | branch
 *
 *
 * Multiple rows belonging to the same teamId
 * are combined into ONE team JSON object.
 */
const uploadTeamsExcel = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({

        success: false,

        error:
          'Please upload an Excel file.'

      });

    }


    const workbook =
      XLSX.read(
        req.file.buffer,
        {
          type: 'buffer'
        }
      );


    if (
      !workbook.SheetNames ||
      workbook.SheetNames.length === 0
    ) {

      return res.status(400).json({

        success: false,

        error:
          'No worksheet found in Excel file.'

      });

    }


    const sheetName =
      workbook.SheetNames[0];


    const worksheet =
      workbook.Sheets[sheetName];


    const rows =
      XLSX.utils.sheet_to_json(
        worksheet,
        {
          defval: ''
        }
      );


    if (!rows.length) {

      return res.status(400).json({

        success: false,

        error:
          'Excel file is empty.'

      });

    }


    /*
     * Required Excel columns
     */
    const requiredColumns = [

      'teamId',
      'teamName',
      'teamSize',
      'name',
      'email',
      'rollNo',
      'mobileNo',
      'course',
      'year',
      'branch'

    ];


    const missingColumns =
      requiredColumns.filter(
        column =>
          !Object.prototype.hasOwnProperty.call(
            rows[0],
            column
          )
      );


    if (missingColumns.length) {

      return res.status(400).json({

        success: false,

        error:
          `Missing required columns: ${missingColumns.join(', ')}`

      });

    }


    /*
     * Remove accidental repeated header rows
     */
    const filteredRows =
      rows.filter(row => {

        const teamId =
          String(row.teamId)
            .trim()
            .toLowerCase();


        const teamName =
          String(row.teamName)
            .trim()
            .toLowerCase();


        const teamSize =
          String(row.teamSize)
            .trim()
            .toLowerCase();


        const name =
          String(row.name)
            .trim()
            .toLowerCase();


        return !(
          teamId === 'teamid' &&
          teamName === 'teamname' &&
          teamSize === 'teamsize' &&
          name === 'name'
        );

      });


    if (!filteredRows.length) {

      return res.status(400).json({

        success: false,

        error:
          'No valid participant rows found in Excel file.'

      });

    }


    /*
     * teamId → complete team JSON object
     */
    const teamsMap =
      new Map();


    const rowErrors = [];


    filteredRows.forEach(
      (row, index) => {

        const rowNumber =
          index + 2;


        const teamId =
          String(row.teamId)
            .trim();


        const teamName =
          String(row.teamName)
            .trim();


        const teamSize =
          Number(row.teamSize);


        /*
         * Member JSON object
         */
        const member = {

          name:
            String(row.name)
              .trim(),

          email:
            String(row.email)
              .trim(),

          rollNo:
            String(row.rollNo)
              .trim(),

          mobileNo:
            String(row.mobileNo)
              .trim(),

          course:
            String(row.course)
              .trim(),

          year:
            String(row.year)
              .trim(),

          branch:
            String(row.branch)
              .trim()

        };


        /*
         * Team ID and Team Name validation
         */
        if (
          !teamId ||
          !teamName
        ) {

          rowErrors.push(
            `Row ${rowNumber}: teamId and teamName are required.`
          );

          return;

        }


        /*
         * Team Size validation
         */
        if (
          !Number.isInteger(teamSize) ||
          teamSize < 1
        ) {

          rowErrors.push(
            `Row ${rowNumber}: teamSize must be a positive integer.`
          );

          return;

        }


        /*
         * Member validation
         */
        const missingMemberField =
          Object.entries(member).find(
            ([, value]) =>
              !value
          );


        if (missingMemberField) {

          rowErrors.push(
            `Row ${rowNumber}: ${missingMemberField[0]} is required.`
          );

          return;

        }


        /*
         * Create team object
         * for first member
         */
        if (
          !teamsMap.has(teamId)
        ) {

          teamsMap.set(
            teamId,
            {

              teamId,

              teamName,

              teamSize,

              members: []

            }
          );

        }


        const team =
          teamsMap.get(teamId);


        /*
         * Same Team ID must always
         * have the same Team Name.
         *
         * This does NOT make Team Names unique.
         */
        if (
          team.teamName !== teamName
        ) {

          rowErrors.push(
            `Row ${rowNumber}: teamName mismatch for teamId ${teamId}.`
          );

          return;

        }


        /*
         * Same Team ID must always
         * have the same Team Size.
         */
        if (
          team.teamSize !== teamSize
        ) {

          rowErrors.push(
            `Row ${rowNumber}: teamSize mismatch for teamId ${teamId}.`
          );

          return;

        }


        /*
         * Add member
         */
        team.members.push(
          member
        );

      }
    );


    /*
     * Stop if row validation failed
     */
    if (rowErrors.length) {

      return res.status(400).json({

        success: false,

        error:
          'Excel validation failed.',

        rowErrors

      });

    }


    /*
     * Convert Map into array
     *
     * ONE JSON OBJECT = ONE TEAM
     */
    const teams =
      Array.from(
        teamsMap.values()
      );


    /*
     * Verify member count
     */
    const memberCountErrors = [];


    teams.forEach(
      team => {

        if (
          team.members.length !==
          team.teamSize
        ) {

          memberCountErrors.push(

            `${team.teamId}: teamSize is ${team.teamSize}, but ${team.members.length} member row(s) found.`

          );

        }

      }
    );


    if (
      memberCountErrors.length
    ) {

      return res.status(400).json({

        success: false,

        error:
          'Team size does not match the number of members.',

        memberCountErrors

      });

    }


    /*
     * Get all Team IDs
     */
    const teamIds =
      teams.map(
        team =>
          team.teamId
      );


    /*
     * Team ID must be unique
     * inside Excel
     */
    if (
      new Set(teamIds).size !==
      teamIds.length
    ) {

      return res.status(400).json({

        success: false,

        error:
          'Duplicate teamId found in Excel file.'

      });

    }


    /*
     * IMPORTANT:
     *
     * Team Names are intentionally
     * NOT checked for uniqueness.
     *
     * Example:
     *
     * TEAM001 → Avengers
     * TEAM002 → Avengers
     *
     * This is allowed.
     */


    /*
     * Check existing Team IDs
     * in Admin MongoDB
     *
     * Team Names are NOT checked.
     */
    const existingTeams =
      await Team.find({

        teamId: {
          $in: teamIds
        }

      });


    if (
      existingTeams.length
    ) {

      return res.status(409).json({

        success: false,

        error:
          'Some team IDs already exist.',

        existingTeams:
          existingTeams.map(
            team => ({

              teamId:
                team.teamId,

              teamName:
                team.teamName

            })
          )

      });

    }


    /*
     * =====================================
     * REGISTER EACH TEAM
     * =====================================
     */
    const registrationResults = [];


    for (
      const team of teams
    ) {

      /*
       * Register in Admin MongoDB
       */
      const createdTeam =
        await Team.create(
          team
        );


      /*
       * Register same team JSON
       * on Level 0 - Level 5
       */
      const levelRegistrations =
        await registerTeamOnAllLevels(
          team
        );


      /*
       * Find failed level registrations
       */
      const failedRegistrations =
        levelRegistrations.filter(
          level =>
            !level.success
        );


      registrationResults.push({

        teamId:
          team.teamId,

        teamName:
          team.teamName,

        teamSize:
          team.teamSize,

        members:
          team.members,

        adminRegistered:
          !!createdTeam,

        levelRegistrationComplete:
          failedRegistrations.length === 0,

        levelRegistrations,

        failedLevelRegistrations:
          failedRegistrations

      });

    }


    /*
     * Overall failed level registrations
     */
    const failedLevelRegistrations =
      registrationResults.flatMap(
        result =>

          result.failedLevelRegistrations
            .map(
              level => ({

                teamId:
                  result.teamId,

                teamName:
                  result.teamName,

                levelUrl:
                  level.url,

                error:
                  level.error

              })
            )

      );


    return res.status(201).json({

      success: true,

      message:
        `${registrationResults.length} team(s) registered successfully.`,

      teamsImported:
        registrationResults.length,

      levelRegistrationComplete:
        failedLevelRegistrations.length === 0,

      failedLevelRegistrations,

      teams:
        registrationResults

    });


  } catch (error) {

    console.error(
      '[Excel Upload Error]:',
      error
    );


    return res.status(500).json({

      success: false,

      error:
        error.message ||
        'Failed to import Excel file.'

    });

  }

};


module.exports = {

  registerTeam,

  getTeamDetails,

  getAllTeams,

  uploadTeamsExcel

};