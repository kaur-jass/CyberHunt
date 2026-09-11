import React, { useMemo, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import {
  QrCode,
  Copy,
  Check,
  Download,
  Printer,
  ExternalLink,
  Network
} from 'lucide-react';

const LEVELS = [
  {
    level: 0,
    name: 'IGNITION',
    prefix: 'IGN',
    baseUrl:
      import.meta.env.VITE_IGNITION_URL
  },
  {
    level: 1,
    name: 'TRACE',
    prefix: 'TRC',
    baseUrl:
      import.meta.env.VITE_TRACE_URL
  },
  {
    level: 2,
    name: 'BREACH',
    prefix: 'BRH',
    baseUrl:
      import.meta.env.VITE_BREACH_URL
  },
  {
    level: 3,
    name: 'PHANTOM',
    prefix: 'PHM',
    baseUrl:
      import.meta.env.VITE_PHANTOM_URL
  },
  {
    level: 4,
    name: 'ZERO DAY',
    prefix: 'ZDY',
    baseUrl:
      import.meta.env.VITE_ZERODAY_URL
  },
  {
    level: 5,
    name: 'NEXUS',
    prefix: 'NEX',
    baseUrl:
      import.meta.env.VITE_NEXUS_URL,
    final: true
  }
];

const ROUTES = [
  'A',
  'B',
  'C',
  'D',
  'E'
];

function buildRouteUrl(
  baseUrl,
  route
) {
  if (!baseUrl) return '';

  return `${baseUrl.replace(
    /\/$/,
    ''
  )}/route-${route.toLowerCase()}`;
}

function downloadQR(
  canvasId,
  fileName
) {
  const canvas =
    document.getElementById(canvasId);

  if (!canvas) return;

  const link =
    document.createElement('a');

  link.download =
    `${fileName}.png`;

  link.href =
    canvas.toDataURL('image/png');

  link.click();
}

export default function LevelQRs() {

  const [selectedLevel, setSelectedLevel] =
    useState('all');

  const [copied, setCopied] =
    useState(null);

  const qrData = useMemo(() => {

    const data = [];

    LEVELS.forEach((level) => {

      /*
       * NEXUS has only one QR.
       */
      if (level.final) {

        data.push({
          level: level.level,
          levelName: level.name,
          route: 'FINAL',
          nodeId: 'NEX-01',
          url: level.baseUrl,
          final: true
        });

        return;
      }

      /*
       * Levels 0-4 have
       * five routes A-E.
       */
      ROUTES.forEach((route) => {

        data.push({
          level: level.level,
          levelName: level.name,
          route,
          nodeId:
            `${level.prefix}-${route}`,
          url: buildRouteUrl(
            level.baseUrl,
            route
          ),
          final: false
        });

      });

    });

    return data;

  }, []);

  const filteredQRs =
    selectedLevel === 'all'
      ? qrData
      : qrData.filter(
          (item) =>
            item.level ===
            Number(selectedLevel)
        );

  const copyURL = async (
    url,
    id
  ) => {

    if (!url) return;

    try {

      await navigator.clipboard.writeText(
        url
      );

      setCopied(id);

      setTimeout(() => {
        setCopied(null);
      }, 1500);

    } catch (error) {

      console.error(
        'Copy failed:',
        error
      );

    }

  };

  const printQRs = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      <div className="ml-64">

        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

          <div>

            <h1 className="text-xl font-semibold">
              QR Management
            </h1>

            <p className="text-xs text-slate-400 mt-1">
              Generate and manage physical hunt checkpoints
            </p>

          </div>

          <button
            onClick={printQRs}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm hover:bg-slate-800 print:hidden"
          >

            <Printer className="w-4 h-4" />

            Print QR Codes

          </button>

        </header>

        <main className="p-8">

          {/* Level Overview */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 print:hidden">

            <div className="flex items-start gap-3">

              <div className="w-9 h-9 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center">

                <QrCode className="w-4 h-4 text-cyan-700" />

              </div>

              <div>

                <h2 className="font-semibold text-slate-900">
                  Physical QR Checkpoints
                </h2>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  Each level is hosted on a separate
                  frontend website. QR codes below point
                  directly to their respective level
                  websites.
                </p>

              </div>

            </div>

            {/* Level Cards */}
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">

              {LEVELS.map((level) => (

                <div
                  key={level.level}
                  className={`rounded-lg p-3 border ${
                    level.final
                      ? 'bg-cyan-50 border-cyan-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >

                  <div className="text-[10px] font-mono text-slate-400">
                    LEVEL {level.level}
                  </div>

                  <div className="font-semibold text-sm mt-1 text-slate-900">
                    {level.name}
                  </div>

                  <div className="text-[10px] font-mono text-cyan-700 mt-1">
                    {level.final
                      ? '1 QR'
                      : '5 ROUTES'}
                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto print:hidden">

            <button
              onClick={() =>
                setSelectedLevel('all')
              }
              className={`px-4 py-2 rounded-lg text-xs font-mono whitespace-nowrap ${
                selectedLevel === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              ALL / 26 QRs
            </button>

            {LEVELS.map((level) => (

              <button
                key={level.level}
                onClick={() =>
                  setSelectedLevel(
                    String(level.level)
                  )
                }
                className={`px-4 py-2 rounded-lg text-xs font-mono whitespace-nowrap ${
                  selectedLevel ===
                  String(level.level)
                    ? 'bg-cyan-700 text-white'
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                L{level.level} / {level.name}
              </button>

            ))}

          </div>

          {/* QR Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {filteredQRs.map((item) => {

              const canvasId =
                `qr-${item.nodeId}`;

              const hasURL =
                Boolean(item.url);

              return (
                <div
                  key={item.nodeId}
                  className={`bg-white rounded-xl overflow-hidden ${
                    item.final
                      ? 'border-2 border-cyan-400'
                      : 'border border-slate-200'
                  }`}
                >

                  {/* Card Header */}
                  <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

                    <div>

                      <div className="flex items-center gap-2">

                        {item.final ? (
                          <Network className="w-4 h-4 text-cyan-600" />
                        ) : (
                          <QrCode className="w-4 h-4 text-slate-400" />
                        )}

                        <span className="font-semibold text-sm">
                          {item.levelName}
                        </span>

                      </div>

                      <div className="text-[10px] font-mono text-slate-400 mt-1">
                        LEVEL {item.level}
                      </div>

                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-1 rounded ${
                        item.final
                          ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                          : 'bg-slate-50 text-slate-500 border border-slate-200'
                      }`}
                    >
                      {item.nodeId}
                    </span>

                  </div>

                  {/* QR */}
                  <div className="p-6 flex flex-col items-center">

                    <div
                      className={`p-4 rounded-xl border ${
                        item.final
                          ? 'border-cyan-200 bg-cyan-50/30'
                          : 'border-slate-200 bg-white'
                      }`}
                    >

                      {hasURL ? (

                        <QRCodeCanvas
                          id={canvasId}
                          value={item.url}
                          size={190}
                          level="H"
                          includeMargin={true}
                        />

                      ) : (

                        <div className="w-[190px] h-[190px] flex items-center justify-center text-center text-xs text-red-500 font-mono">
                          URL NOT CONFIGURED
                        </div>

                      )}

                    </div>

                    {/* Route */}
                    <div className="mt-5 text-center">

                      <div className="text-lg font-bold text-slate-900">

                        {item.final
                          ? 'FINAL NODE'
                          : `ROUTE ${item.route}`}

                      </div>

                      <div className="text-[10px] font-mono text-slate-400 mt-1">
                        {item.nodeId}
                      </div>

                    </div>

                  </div>

                  {/* URL */}
                  <div className="px-5 pb-5">

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">

                      <div className="text-[9px] font-mono uppercase text-slate-400">
                        Destination URL
                      </div>

                      {hasURL ? (

                        <div className="mt-1 text-[10px] font-mono text-slate-600 break-all leading-4">
                          {item.url}
                        </div>

                      ) : (

                        <div className="mt-1 text-[10px] font-mono text-red-500">
                          Environment variable missing
                        </div>

                      )}

                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 mt-3 print:hidden">

                      <button
                        disabled={!hasURL}
                        onClick={() =>
                          copyURL(
                            item.url,
                            item.nodeId
                          )
                        }
                        className="flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 py-2 rounded-lg text-xs hover:bg-slate-50 disabled:opacity-40"
                      >

                        {copied ===
                        item.nodeId ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy URL
                          </>
                        )}

                      </button>

                      <button
                        disabled={!hasURL}
                        onClick={() =>
                          downloadQR(
                            canvasId,
                            item.nodeId
                          )
                        }
                        className="flex items-center justify-center gap-2 bg-slate-900 text-white py-2 rounded-lg text-xs hover:bg-slate-800 disabled:opacity-40"
                      >

                        <Download className="w-3.5 h-3.5" />

                        Download

                      </button>

                    </div>

                    {hasURL && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-mono text-cyan-700 hover:underline print:hidden"
                      >

                        Open Destination

                        <ExternalLink className="w-3 h-3" />

                      </a>
                    )}

                  </div>

                </div>
              );

            })}

          </div>

        </main>

      </div>

    </div>
  );
}