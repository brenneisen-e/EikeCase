import React from 'react';

const barmeniaHTML = `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Persönliche Produktion - Barmenia Gothaer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', 'Aptos', system-ui, -apple-system, sans-serif;
            background-color: #f5f5f5;
            display: flex;
            min-height: 100vh;
        }

        /* Sidebar Styles */
        .sidebar {
            width: 220px;
            background: linear-gradient(180deg, #0d3654 0%, #1a4a6e 100%);
            color: white;
            padding: 20px;
            position: relative;
        }

        .sidebar h2 {
            font-size: 16px;
            margin-bottom: 5px;
            font-weight: 600;
        }

        .sidebar .subtitle {
            font-size: 12px;
            opacity: 0.8;
            margin-bottom: 30px;
        }

        .sidebar .status {
            font-size: 13px;
            margin: 20px 0;
        }

        .sidebar .bd-number {
            font-size: 13px;
            margin: 10px 0;
        }

        .sidebar .date-info {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.2);
        }

        .sidebar .provision-info {
            margin-top: 30px;
        }

        .provision-bar {
            margin-top: 20px;
            height: 200px;
            position: relative;
        }

        .bar-segment {
            width: 100%;
            position: absolute;
            left: 0;
            text-align: center;
            color: white;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease, filter 0.3s ease;
            cursor: pointer;
        }

        .bar-segment:hover {
            transform: translateX(5px);
            filter: brightness(1.2);
        }

        .bar-alt {
            background: #5a9fd4;
            height: 100px;
            top: 0;
        }

        .bar-neu {
            background: #4a7fa4;
            height: 100px;
            top: 100px;
        }

        .bar-labels {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
            font-size: 11px;
        }

        /* Main Content */
        .main-content {
            flex: 1;
            padding: 30px;
            background: white;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 18px;
            margin-bottom: 5px;
        }

        .header .period {
            font-size: 14px;
            color: #666;
        }

        .logo {
            position: absolute;
            top: 20px;
            right: 30px;
            height: 40px;
        }

        /* Charts Grid */
        .charts-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }

        .chart-container {
            background: white;
            border: 1px solid #e0e0e0;
            padding: 15px;
            border-radius: 4px;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .chart-container:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transform: translateY(-2px);
        }

        .chart-title {
            font-size: 12px;
            font-weight: 600;
            text-align: center;
            margin-bottom: 10px;
        }

        .bar-chart {
            height: 120px;
            display: flex;
            align-items: flex-end;
            justify-content: space-around;
            margin: 20px 0;
        }

        .bar {
            width: 30px;
            background: #8b8b8b;
            position: relative;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .bar:hover {
            transform: scaleY(1.05);
            filter: brightness(1.1);
        }

        .bar.year-2024 { background: #8b8b8b; }
        .bar.year-2025 { background: #4a4a4a; }
        .bar.projection { background: #1a4a6e; }

        .bar-value {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 10px;
            font-weight: 600;
            white-space: nowrap;
        }

        .chart-legend {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 10px;
            font-size: 10px;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .legend-box {
            width: 12px;
            height: 12px;
            border-radius: 2px;
        }

        /* Tables */
        .tables-section {
            margin-top: 30px;
        }

        .section-title {
            background: linear-gradient(90deg, #d4e4f7 0%, #a8c8e8 100%);
            padding: 8px 15px;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 0;
            border-radius: 4px 4px 0 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            margin-bottom: 20px;
        }

        th, td {
            padding: 8px 12px;
            text-align: right;
            font-size: 12px;
            border: 1px solid #e0e0e0;
            transition: background-color 0.3s ease;
        }

        th {
            background: #f8f8f8;
            font-weight: 600;
        }

        td:first-child, th:first-child {
            text-align: left;
        }

        tr:hover td {
            background-color: #f0f7ff;
        }

        .value-cell {
            cursor: pointer;
            position: relative;
        }

        .value-cell:hover {
            background-color: #e3f2fd !important;
            font-weight: 600;
        }

        .negative {
            color: #d32f2f;
        }

        .positive {
            color: #388e3c;
        }

        /* Right side chart */
        .side-chart {
            grid-column: span 1;
            background: white;
            border: 1px solid #e0e0e0;
            padding: 15px;
            border-radius: 4px;
        }

        .side-chart-bars {
            margin-top: 20px;
        }

        .horizontal-bar {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }

        .horizontal-bar-label {
            width: 40px;
            font-size: 11px;
            color: #666;
        }

        .horizontal-bar-track {
            flex: 1;
            height: 25px;
            background: #f0f0f0;
            position: relative;
            overflow: hidden;
        }

        .horizontal-bar-fill {
            height: 100%;
            background: #1a4a6e;
            position: absolute;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 5px;
            color: white;
            font-size: 11px;
            transition: width 0.5s ease;
        }

        /* Tooltip */
        .tooltip {
            position: absolute;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 11px;
            pointer-events: none;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        /* Animations */
        @keyframes slideIn {
            from {
                transform: translateX(-20px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .animated {
            animation: slideIn 0.5s ease;
        }

        /* Grid Layout for Tables */
        .tables-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }

        .table-wrapper {
            overflow: hidden;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <div class="sidebar">
        <select style="width: 100%; padding: 5px; margin-bottom: 20px; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3);">
            <option>Max Mustermann</option>
        </select>

        <h2>Max Mustermann</h2>
        <div class="subtitle">Leiter des Service-Centers</div>

        <div class="status">Status: Offen</div>

        <div class="bd-number">
            <strong>BD-Nummer:</strong> 00000001<br>
            <strong>Eintrittsdatum:</strong> 01.01.2000
        </div>

        <div class="date-info">
            <strong>Ab 01.01.2026</strong><br>
            <span style="font-size: 11px;">Agenturleitung<br>Generalagentur I</span>
        </div>

        <div class="provision-info">
            <strong>Veränderung Vergütung ggü.<br>Durchschnitt Wertungsjahre 23/24<br>und 24/25</strong>
            <span style="font-size: 11px;">(simuliert)</span>

            <div style="margin-top: 10px; font-size: 11px;">in EUR</div>

            <div class="provision-bar">
                <div class="bar-segment bar-alt" style="height: 60%;">
                    <span>77.748</span>
                </div>
                <div class="bar-segment bar-neu" style="height: 40%; top: 60%;">
                    <span>92.211</span>
                </div>
            </div>

            <div class="bar-labels">
                <span>Alt</span>
                <span>Neu</span>
            </div>

            <div style="margin-top: 20px; font-size: 12px;">
                <strong>Alt (rechnerisch), Neu (Simuliert)</strong>
            </div>

            <div style="margin-top: 30px; font-size: 11px; text-align: center;">
                Vergleich Durchschnitt Wertungsjahre 23/24<br>
                und 24/25 mit simulierter Neuvergütung
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <div class="header">
            <h1>Persönliche Produktion*</h1>
            <div class="period">Wertungsjahre 2023/2024 und 2024/2025</div>
            <div class="period" style="font-size: 11px; color: #999; margin-top: 5px;">Stand 30.06.2025</div>
        </div>

        <!-- Logo placeholder -->
        <div style="position: absolute; top: 20px; right: 30px; font-size: 24px; color: #1a4a6e;">
            <strong>Barmenia</strong> Gothaer
        </div>

        <!-- Charts Grid -->
        <div class="charts-grid">
            <!-- S/U inkl. Tier Chart -->
            <div class="chart-container">
                <div class="chart-title">S/U inkl. Tier (JB in TEUR)</div>
                <div class="bar-chart">
                    <div class="bar year-2024" style="height: 40%;">
                        <span class="bar-value">12,1</span>
                    </div>
                    <div class="bar year-2025" style="height: 75%;">
                        <span class="bar-value">37,6</span>
                    </div>
                    <div class="bar projection" style="height: 50%;">
                        <span class="bar-value">23,9</span>
                    </div>
                </div>
                <div style="text-align: center; font-size: 11px; color: #666;">
                    MPL: 1 LS | 2 LS | 3 LS
                </div>
                <div class="chart-legend">
                    <div class="legend-item">
                        <div class="legend-box" style="background: #8b8b8b;"></div>
                        <span>2024</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box" style="background: #4a4a4a;"></div>
                        <span>2025</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box" style="background: #1a4a6e;"></div>
                        <span>⌀</span>
                    </div>
                </div>
            </div>

            <!-- KFZ Chart -->
            <div class="chart-container">
                <div class="chart-title">KFZ (JB in TEUR)</div>
                <div class="bar-chart">
                    <div class="bar year-2024" style="height: 20%;">
                        <span class="bar-value">2,4</span>
                    </div>
                    <div class="bar year-2025" style="height: 60%;">
                        <span class="bar-value">14,0</span>
                    </div>
                    <div class="bar projection" style="height: 35%;">
                        <span class="bar-value">8,2</span>
                    </div>
                </div>
                <div style="text-align: center; font-size: 11px; color: #666;">
                    MPL: 3 LS | 2 LS
                </div>
                <div class="chart-legend">
                    <div class="legend-item">
                        <div class="legend-box" style="background: #8b8b8b;"></div>
                        <span>2024</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box" style="background: #4a4a4a;"></div>
                        <span>2025</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box" style="background: #1a4a6e;"></div>
                        <span>⌀</span>
                    </div>
                </div>
            </div>

            <!-- KV Chart -->
            <div class="chart-container">
                <div class="chart-title">KV (MB in TEUR)</div>
                <div class="bar-chart">
                    <div class="bar year-2024" style="height: 45%;">
                        <span class="bar-value">11,2</span>
                    </div>
                    <div class="bar year-2025" style="height: 60%;">
                        <span class="bar-value">14,5</span>
                    </div>
                    <div class="bar projection" style="height: 52%;">
                        <span class="bar-value">12,9</span>
                    </div>
                </div>
                <div style="text-align: center; font-size: 11px; color: #666;">
                    MPL: 3 LS<br>
                    MBZ: 130,7
                </div>
                <div class="chart-legend">
                    <div class="legend-item">
                        <div class="legend-box" style="background: #8b8b8b;"></div>
                        <span>2024</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box" style="background: #4a4a4a;"></div>
                        <span>2025</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box" style="background: #1a4a6e;"></div>
                        <span>⌀</span>
                    </div>
                </div>
            </div>

            <!-- LV Chart -->
            <div class="chart-container">
                <div class="chart-title">LV (BBSU in TEUR)</div>
                <div class="bar-chart">
                    <div class="bar year-2024" style="height: 55%;">
                        <span class="bar-value">130,7</span>
                    </div>
                    <div class="bar year-2025" style="height: 20%;">
                        <span class="bar-value">44,5</span>
                    </div>
                    <div class="bar projection" style="height: 75%;">
                        <span class="bar-value">118,3</span>
                    </div>
                </div>
                <div style="text-align: center; font-size: 11px; color: #666;">
                    MPL: 3 LS | 2 LS | 1 LS
                </div>
                <div class="chart-legend">
                    <div class="legend-item">
                        <div class="legend-box" style="background: #8b8b8b;"></div>
                        <span>2024</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box" style="background: #4a4a4a;"></div>
                        <span>2025</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box" style="background: #1a4a6e;"></div>
                        <span>⌀</span>
                    </div>
                </div>
            </div>

            <!-- Side Chart -->
            <div class="side-chart">
                <div class="chart-title" style="font-size: 10px; text-align: left;">in € EUR</div>
                <div style="margin: 15px 0;">
                    <div style="font-size: 11px; color: #666;">S/U ohne Kfz</div>
                    <div style="font-size: 20px; font-weight: 600;">209,3</div>
                </div>
                <div style="margin: 15px 0;">
                    <div style="font-size: 11px; color: #666;">Tier-KV</div>
                    <div style="font-size: 16px;">12,4</div>
                </div>
                <div style="margin: 15px 0;">
                    <div style="font-size: 11px; color: #666;">Kfz</div>
                    <div style="font-size: 16px;">56,7</div>
                </div>
                <div style="margin: 15px 0;">
                    <div style="font-size: 11px; color: #666;">LV</div>
                    <div style="font-size: 16px;">191,7</div>
                </div>
                <div style="margin: 15px 0; padding-top: 10px; border-top: 1px solid #e0e0e0;">
                    <div style="font-size: 11px; color: #666;">KV</div>
                    <div style="font-size: 24px; font-weight: 600; color: #1a4a6e;">931,8</div>
                </div>
            </div>
        </div>

        <!-- Tables Section -->
        <div class="tables-section">
            <h3 style="text-align: center; margin-bottom: 20px; font-size: 14px;">
                Vergleich Vergütung zwischen Alt (rechnerisch) und Neu (Simulationsergebnis)
            </h3>

            <!-- Abschlussprovision Table -->
            <div class="tables-grid">
                <div class="table-wrapper">
                    <div class="section-title">Abschlussprovisionen</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Produktion</th>
                                <th>AP Alt</th>
                                <th>AP Neu</th>
                                <th>AP Differenz</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>S/U ohne Kfz</td>
                                <td class="value-cell">23.608</td>
                                <td class="value-cell">9.598</td>
                                <td class="value-cell negative">-11.060</td>
                            </tr>
                            <tr>
                                <td>Tier-KV</td>
                                <td class="value-cell">2.248</td>
                                <td class="value-cell">650</td>
                                <td class="value-cell negative">-49</td>
                            </tr>
                            <tr>
                                <td>Kfz</td>
                                <td class="value-cell">8.185</td>
                                <td class="value-cell">655</td>
                                <td class="value-cell negative">-164</td>
                            </tr>
                            <tr>
                                <td>LV - Biometrie</td>
                                <td class="value-cell">18.872</td>
                                <td class="value-cell">482</td>
                                <td class="value-cell negative">-179</td>
                            </tr>
                            <tr>
                                <td>LV - Direkt</td>
                                <td class="value-cell">54.370</td>
                                <td class="value-cell">544</td>
                                <td class="value-cell negative">-761</td>
                            </tr>
                            <tr>
                                <td>LV - Invest</td>
                                <td class="value-cell">43.011</td>
                                <td class="value-cell">989</td>
                                <td class="value-cell negative">-43</td>
                            </tr>
                            <tr>
                                <td>KV - Pflege</td>
                                <td class="value-cell">1.118</td>
                                <td class="value-cell">1.674</td>
                                <td class="value-cell positive">556</td>
                            </tr>
                            <tr>
                                <td>KV - Voll</td>
                                <td class="value-cell">9.948</td>
                                <td class="value-cell">64.014</td>
                                <td class="value-cell positive">50.146</td>
                            </tr>
                            <tr>
                                <td>KV - Zusatz</td>
                                <td class="value-cell">931</td>
                                <td class="value-cell">6.746</td>
                                <td class="value-cell positive">2.094</td>
                            </tr>
                            <tr style="font-weight: 600; background: #f8f8f8;">
                                <td>Totals</td>
                                <td class="value-cell">161.287</td>
                                <td class="value-cell">92.211</td>
                                <td class="value-cell">32.544</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table-wrapper">
                    <div class="section-title" style="background: linear-gradient(90deg, #5eb3e6 0%, #3d95d3 100%);">
                        Folgeprovisionen auf Altbestand (Keine Änderung, Bestandsschutzgarantie)
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Bestand</th>
                                <th>FP Alt</th>
                                <th>FP Neu</th>
                                <th>FP Differenz</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>S/U ohne Kfz PK</td>
                                <td class="value-cell">209.340</td>
                                <td class="value-cell">42.015</td>
                                <td class="value-cell positive">4.187</td>
                            </tr>
                            <tr>
                                <td>Tier-KV</td>
                                <td class="value-cell">12.396</td>
                                <td class="value-cell">2.541</td>
                                <td class="value-cell positive">248</td>
                            </tr>
                            <tr>
                                <td>Kfz</td>
                                <td class="value-cell">56.725</td>
                                <td class="value-cell">5.673</td>
                                <td class="value-cell">0</td>
                            </tr>
                            <tr>
                                <td>LV - Biometrie</td>
                                <td class="value-cell">26.720</td>
                                <td class="value-cell">428</td>
                                <td class="value-cell">0</td>
                            </tr>
                            <tr>
                                <td>LV - Direkt</td>
                                <td class="value-cell">4.850</td>
                                <td class="value-cell">73</td>
                                <td class="value-cell">0</td>
                            </tr>
                            <tr>
                                <td>LV - Invest</td>
                                <td class="value-cell">70.444</td>
                                <td class="value-cell">1.127</td>
                                <td class="value-cell">0</td>
                            </tr>
                            <tr>
                                <td>KV - Pflege</td>
                                <td class="value-cell">339.312</td>
                                <td class="value-cell">2.714</td>
                                <td class="value-cell">0</td>
                            </tr>
                            <tr>
                                <td>KV - Voll</td>
                                <td class="value-cell">2.244.767</td>
                                <td class="value-cell">35.916</td>
                                <td class="value-cell">0</td>
                            </tr>
                            <tr>
                                <td>KV - Zusatz</td>
                                <td class="value-cell">336.755</td>
                                <td class="value-cell">5.388</td>
                                <td class="value-cell">0</td>
                            </tr>
                            <tr style="font-weight: 600; background: #f8f8f8;">
                                <td>Totals</td>
                                <td class="value-cell">3.301.027</td>
                                <td class="value-cell">96.775</td>
                                <td class="value-cell">4.435</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Additional Tables -->
            <div class="tables-grid" style="margin-top: 20px;">
                <div class="table-wrapper">
                    <div class="section-title">Sonstige erfolgsabhängige Vergütungen</div>
                    <table>
                        <tbody>
                            <tr>
                                <td>S/U-Absatzbonus</td>
                                <td class="value-cell">18.081</td>
                                <td class="value-cell negative">-18.081</td>
                            </tr>
                            <tr style="font-weight: 600;">
                                <td>Totals</td>
                                <td class="value-cell">18.081</td>
                                <td class="value-cell negative">-18.081</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table-wrapper">
                    <div class="section-title" style="background: linear-gradient(90deg, #5eb3e6 0%, #3d95d3 100%);">Zuschüsse</div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Bürozuschuss</td>
                                <td class="value-cell">4.800</td>
                                <td class="value-cell">4.800</td>
                                <td class="value-cell">0</td>
                            </tr>
                            <tr style="font-weight: 600;">
                                <td>Totals</td>
                                <td class="value-cell">4.800</td>
                                <td class="value-cell">4.800</td>
                                <td class="value-cell">0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Bottom Tables -->
            <div style="margin-top: 30px;">
                <h3 style="text-align: center; margin-bottom: 20px; font-size: 14px;">
                    Aufstellung persönliche Provisionssätze
                </h3>
                <div class="tables-grid">
                    <div class="table-wrapper">
                        <div class="section-title" style="background: #2c5282; color: white;">Abschlussprovisionsätze</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sparte</th>
                                    <th>Satz %</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>S/U</td><td class="value-cell">15.0</td></tr>
                                <tr><td>Tier-KV</td><td class="value-cell">12.5</td></tr>
                                <tr><td>Kfz</td><td class="value-cell">8.0</td></tr>
                                <tr><td>LV-Biometrie</td><td class="value-cell">25.0</td></tr>
                                <tr><td>LV-Direkt</td><td class="value-cell">20.0</td></tr>
                                <tr><td>LV-Invest</td><td class="value-cell">15.0</td></tr>
                                <tr><td>KV-Pflege</td><td class="value-cell">10.0</td></tr>
                                <tr><td>KV-Voll</td><td class="value-cell">5.0</td></tr>
                                <tr><td>KV-Zusatz</td><td class="value-cell">5.0</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table-wrapper">
                        <div class="section-title" style="background: #2c5282; color: white;">Folgeprovisionsätze (Barmenia-Altbestand)</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sparte</th>
                                    <th>Satz %</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>S/U</td><td class="value-cell">2.5</td></tr>
                                <tr><td>Tier-KV</td><td class="value-cell">2.0</td></tr>
                                <tr><td>Kfz</td><td class="value-cell">1.5</td></tr>
                                <tr><td>LV-Biometrie</td><td class="value-cell">3.0</td></tr>
                                <tr><td>LV-Direkt</td><td class="value-cell">2.5</td></tr>
                                <tr><td>LV-Invest</td><td class="value-cell">2.0</td></tr>
                                <tr><td>KV-Pflege</td><td class="value-cell">1.0</td></tr>
                                <tr><td>KV-Voll</td><td class="value-cell">0.8</td></tr>
                                <tr><td>KV-Zusatz</td><td class="value-cell">0.8</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table-wrapper">
                        <div class="section-title" style="background: #2c5282; color: white;">Folgeprovisionsätze (Neubestand ab 01.01.2026)</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sparte</th>
                                    <th>Satz %</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>S/U</td><td class="value-cell">1.5</td></tr>
                                <tr><td>Tier-KV</td><td class="value-cell">1.2</td></tr>
                                <tr><td>Kfz</td><td class="value-cell">0.8</td></tr>
                                <tr><td>LV-Biometrie</td><td class="value-cell">2.0</td></tr>
                                <tr><td>LV-Direkt</td><td class="value-cell">1.5</td></tr>
                                <tr><td>LV-Invest</td><td class="value-cell">1.2</td></tr>
                                <tr><td>KV-Pflege</td><td class="value-cell">0.5</td></tr>
                                <tr><td>KV-Voll</td><td class="value-cell">0.4</td></tr>
                                <tr><td>KV-Zusatz</td><td class="value-cell">0.4</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Add interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            // Animate bars on load
            const bars = document.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                const originalHeight = bar.style.height;
                bar.style.height = '0';
                setTimeout(() => {
                    bar.style.transition = 'height 0.5s ease';
                    bar.style.height = originalHeight;
                }, index * 100);
            });

            // Add hover effects to table cells
            const valueCells = document.querySelectorAll('.value-cell');
            valueCells.forEach(cell => {
                cell.addEventListener('mouseenter', function(e) {
                    const value = parseFloat(this.textContent.replace(',', '.'));
                    if (!isNaN(value)) {
                        const tooltip = document.createElement('div');
                        tooltip.className = 'tooltip';
                        tooltip.textContent = \`€ \${value.toLocaleString('de-DE', { minimumFractionDigits: 2 })}\`;
                        document.body.appendChild(tooltip);

                        tooltip.style.left = e.pageX + 10 + 'px';
                        tooltip.style.top = e.pageY - 30 + 'px';
                        tooltip.style.opacity = '1';

                        this.tooltip = tooltip;
                    }
                });

                cell.addEventListener('mouseleave', function() {
                    if (this.tooltip) {
                        this.tooltip.remove();
                    }
                });
            });

            // Add click effect to charts
            const chartContainers = document.querySelectorAll('.chart-container');
            chartContainers.forEach(container => {
                container.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                });
            });

            // Add pulse effect to important numbers
            const importantNumbers = document.querySelectorAll('.side-chart div[style*="font-size: 24px"]');
            importantNumbers.forEach(num => {
                setInterval(() => {
                    num.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        num.style.transform = 'scale(1)';
                    }, 500);
                }, 3000);
            });
        });
    </script>
</body>
</html>`;

export default function BarmeniaPrototypePreview() {
  return (
    <iframe
      srcDoc={barmeniaHTML}
      className="w-full h-full border-0"
      title="Barmenia Gothaer Prototype"
      style={{ minHeight: '100%' }}
    />
  );
}
