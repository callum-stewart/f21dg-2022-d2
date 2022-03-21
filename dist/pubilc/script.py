#import micropip
import os
os.environ['MPLBACKEND'] = 'AGG'
import numpy as np
import io, base64, json
from scipy import signal
import matplotlib.pyplot as plt
import mpld3
import emd
from random import gauss
from random import seed
from pandas import Series

GOOGL_FINANCIAL_DATA = [853.64, 857.84, 861.41, 864.58, 865.91, 868.39, 870.0, 872.37, 867.91, 850.14, 849.8, 839.65, 835.14, 838.51, 840.63, 849.87, 849.48, 847.8, 856.75, 852.57, 848.91, 845.1, 842.1, 841.7, 839.88,
                        841.46, 840.18, 855.13, 853.99, 856.51, 860.08, 858.95, 878.93, 888.84, 889.14, 891.44, 924.52, 932.82, 937.09, 948.45, 954.72, 950.28, 958.69, 956.71, 954.84, 955.89, 955.14, 959.22, 964.61,
                        942.17, 950.5, 954.65, 964.07, 970.55, 977.61, 991.86, 993.27, 996.17, 987.09, 988.29, 996.12, 1003.88, 996.68, 1001.5, 1004.28, 970.12, 961.81, 970.5, 967.93, 960.18, 958.62, 975.22, 968.99,
                        978.59, 976.62, 986.09, 972.09, 948.09, 961.01, 937.82, 929.68, 919.46, 932.26, 927.69, 940.81, 951.0, 953.53, 967.66, 968.85, 976.91, 975.96, 986.95, 992.77, 992.19, 993.84, 998.31, 969.03,
                        965.31, 952.51, 958.33, 945.5, 946.56, 947.64, 940.3, 945.79, 945.75, 944.19, 940.08, 923.59, 930.09, 938.93, 938.08, 944.27, 927.66, 926.18, 920.87, 940.4, 942.58, 936.89, 930.5, 928.13, 935.75,
                        943.63, 955.24, 951.99, 941.48, 942.02, 949.89, 941.41, 943.29, 946.65, 950.44, 940.13, 935.29, 929.75, 936.86, 947.54, 947.55, 943.26, 934.28, 937.43, 959.9, 964.81, 973.72, 967.47, 972.08, 966.78, 985.19, 993.64,
                        992.31, 987.8, 1005.65, 1005.65, 1007.87, 1009.35, 1011.0, 1012.74, 1001.84, 1005.07, 985.54, 988.49, 991.46, 991.42, 1033.67, 1033.13, 1033.04, 1042.6, 1042.97, 1049.99, 1042.68, 1052.39, 1058.29, 1047.72, 1044.15,
                        1041.2, 1041.64, 1036.41, 1048.47, 1035.89, 1034.66, 1050.3, 1051.92, 1056.52, 1072.01, 1063.29, 1037.38, 1036.17, 1025.07, 1011.87, 1019.6, 1032.72, 1044.57, 1049.38, 1051.97, 1048.77, 1051.39, 1057.47, 1072.0,
                        1085.09, 1079.78, 1073.56, 1070.85, 1068.86, 1065.85, 1060.2, 1055.95, 1053.4, 1073.21, 1091.52, 1095.76, 1110.29, 1114.21, 1112.79, 1110.14, 1112.05, 1130.65, 1130.7, 1139.1, 1135.97, 1143.5, 1164.16, 1176.17,
                        1171.29, 1182.14, 1187.56, 1186.48, 1177.37, 1182.22, 1181.59, 1119.2, 1062.39, 1084.43, 1055.41, 1007.71, 1046.27, 1054.56, 1054.14, 1072.7, 1091.36, 1095.5, 1103.59, 1113.75, 1109.9, 1128.09, 1143.7, 1117.51,
                        1103.92, 1071.41, 1084.14, 1094.76, 1100.9, 1115.04, 1129.38, 1160.84, 1165.93, 1139.91, 1148.89, 1150.61, 1134.42, 1100.07, 1095.8, 1094.0, 1053.15, 1026.55, 1054.09, 1006.94, 1005.18, 1037.14, 1012.63, 1018.68,
                        1029.71, 1032.64, 1009.95, 1020.09, 1036.5, 1025.06, 1037.29, 1036.04, 1046.1, 1079.36, 1075.39, 1089.45, 1077.32, 1073.81, 1022.64, 1022.99, 1043.31, 1031.45, 1018.58, 1040.75, 1026.05, 1026.3, 1051.0, 1059.46,
                        1058.59, 1088.95, 1105.47, 1103.38, 1106.6, 1084.87, 1084.09, 1081.26, 1069.64, 1084.01, 1075.31, 1085.96, 1085.45, 1084.08, 1068.07, 1077.47, 1100.0, 1135.0, 1153.04, 1151.02, 1146.95, 1134.42, 1132.71, 1140.9,
                        1148.19, 1144.23, 1160.11, 1159.27, 1183.58, 1178.69, 1184.07, 1169.44, 1169.29, 1139.28, 1132.62, 1116.94, 1126.78, 1129.19, 1142.11, 1116.28, 1141.29, 1155.08, 1167.28, 1167.14, 1171.46, 1201.26, 1204.42, 1196.51,
                        1213.08, 1212.91, 1199.1, 1197.88, 1211.0, 1258.15, 1275.94, 1285.5, 1252.89, 1230.04, 1227.22, 1232.99, 1241.13, 1238.16, 1237.67, 1255.84, 1261.33, 1264.46, 1252.51, 1248.64, 1258.14, 1232.22, 1224.06, 1215.85,
                        1221.95, 1217.41, 1221.75, 1221.16, 1236.75, 1256.27, 1245.86, 1264.65, 1254.44, 1231.8, 1211.31, 1199.1, 1183.99, 1177.59, 1175.06, 1189.99, 1171.6, 1182.14, 1177.98, 1159.83, 1167.11, 1174.27, 1191.57, 1172.12,
                        1179.56, 1193.89, 1194.06, 1207.36, 1207.08, 1208.53, 1207.64, 1211.53, 1177.07, 1167.83, 1155.92, 1145.17, 1092.16, 1090.74, 1120.54, 1102.44, 1133.08, 1127.59, 1097.91, 1105.18, 1111.37, 1114.91, 1057.12, 1103.59,
                        1083.75, 1034.73, 1049.51, 1090.58, 1085.98, 1071.49, 1055.73, 1069.57, 1108.24, 1094.63, 1077.02, 1049.36, 1047.97, 1054.58, 1071.05, 1068.27, 1027.42, 1030.45, 1043.43, 1030.1, 1055.94, 1052.28, 1091.79, 1094.58,
                        1109.65, 1116.36, 1062.47, 1078.08, 1046.58, 1053.18, 1061.65, 1073.73, 1073.54, 1051.71, 1025.65, 1043.41, 1035.46, 1023.58, 991.25, 984.67, 1047.85, 1052.9, 1046.68, 1044.96, 1054.68, 1025.47, 1078.07, 1075.92,
                        1085.37, 1081.65, 1078.83, 1064.47, 1051.51, 1086.51, 1089.51, 1099.12, 1107.3, 1078.63, 1084.41, 1084.0, 1101.51, 1079.86, 1070.06, 1097.99, 1125.89, 1118.62, 1141.42, 1151.87, 1122.89, 1105.91, 1102.38, 1102.12,
                        1127.58, 1128.63, 1129.2, 1119.63, 1126.51, 1120.59, 1104.21, 1116.56, 1117.33, 1122.01, 1122.89, 1126.55, 1148.52, 1153.42, 1169.19, 1164.94, 1150.85, 1149.97, 1179.26, 1197.25, 1199.06, 1192.53, 1190.3, 1188.55,
                        1202.46, 1226.43, 1236.13, 1207.65, 1197.38, 1189.84, 1178.01, 1172.27, 1176.89, 1198.98, 1205.54, 1210.81, 1219.45, 1211.45, 1208.28, 1202.69, 1206.45, 1209.59, 1222.73, 1226.53, 1231.91, 1240.14, 1241.47, 1253.76,
                        1270.59, 1260.05, 1267.34, 1277.42, 1296.2, 1198.96, 1173.32, 1166.51, 1189.55, 1193.46, 1178.86, 1170.78, 1167.97, 1167.64, 1136.59, 1124.86, 1170.8, 1184.5, 1168.78, 1144.66, 1154.44, 1155.85, 1145.34, 1138.61,
                        1139.56, 1119.94, 1121.41, 1106.5, 1038.74, 1054.49, 1044.64, 1047.76, 1068.37, 1082.76, 1081.04, 1079.1, 1091.01, 1086.3, 1093.89, 1105.24, 1104.51, 1113.2, 1125.37, 1116.7, 1087.58, 1080.32, 1076.63, 1082.8,
                        1100.0, 1112.6, 1122.99, 1132.67, 1116.79, 1124.29, 1140.91, 1144.08, 1145.34, 1150.51, 1153.46, 1146.74, 1147.24, 1131.55, 1139.21, 1148.05, 1139.73, 1135.94, 1245.22, 1241.84, 1228.0, 1218.2, 1211.78, 1196.32,
                        1154.75, 1171.08, 1175.91, 1206.19, 1188.9, 1174.5, 1196.73, 1164.25, 1169.32, 1179.21, 1200.44, 1183.53, 1191.58, 1191.52, 1153.58, 1171.18, 1170.82, 1173.75, 1194.24, 1190.53, 1169.55, 1182.27, 1212.19, 1206.32,
                        1205.27, 1205.7, 1220.0, 1234.97, 1240.03, 1231.63, 1229.88, 1232.65, 1238.75, 1229.84, 1234.69, 1218.33, 1245.94, 1242.29, 1225.95, 1221.14, 1206.0, 1177.92, 1189.43, 1210.96, 1208.25, 1190.13, 1202.4, 1209.47,
                        1215.71, 1217.77, 1242.24, 1243.0, 1252.8, 1244.41, 1244.28, 1241.2, 1257.63, 1259.11, 1264.3, 1288.98, 1260.66, 1260.7, 1258.8, 1272.25, 1289.61, 1291.44, 1291.01, 1306.94, 1309.0, 1298.28, 1297.21, 1296.18, 1309.15,
                        1333.54, 1319.84, 1312.59, 1301.86, 1300.14, 1293.67, 1305.64, 1313.0, 1312.13, 1304.09, 1288.86, 1294.74, 1318.94, 1326.96, 1339.39, 1342.99, 1342.89, 1344.25, 1348.49, 1346.87, 1360.7, 1354.89, 1351.91, 1356.44,
                        1351.22, 1350.63, 1344.43, 1362.47, 1354.64, 1339.71, 1339.39, 1368.68, 1361.52, 1397.81, 1395.11, 1405.04, 1419.79, 1428.96, 1440.03, 1430.59, 1439.2, 1450.16, 1479.52, 1482.25, 1483.87, 1484.69, 1466.17, 1431.73,
                        1450.5, 1456.7, 1454.25, 1432.78, 1482.6, 1445.41, 1446.05, 1475.97, 1479.11, 1508.66, 1510.06, 1518.63, 1513.39, 1518.73, 1519.44, 1524.87, 1516.99, 1483.46, 1419.86, 1386.32, 1390.47, 1314.95, 1339.25, 1386.32,
                        1337.72, 1381.6, 1314.76, 1295.74, 1215.79, 1275.17, 1210.9, 1111.55, 1214.27, 1073.0, 1118.06, 1091.19, 1111.67, 1068.21, 1054.13, 1130.01, 1101.62, 1162.92, 1110.26, 1146.31, 1161.95, 1102.1, 1117.03, 1092.7,
                        1183.19, 1182.56, 1207.0, 1206.57, 1210.41, 1265.23, 1257.3, 1257.43, 1279.0, 1261.15, 1212.16, 1258.41, 1271.17, 1276.6, 1270.86, 1232.59, 1342.18, 1346.7, 1317.32, 1322.9, 1349.02, 1345.43, 1369.28, 1384.34, 1403.59,
                        1375.18, 1348.33, 1356.86, 1373.06, 1385.18, 1374.4, 1409.16, 1406.75, 1413.24, 1421.37, 1420.28, 1418.24, 1433.52, 1434.87, 1442.31, 1439.25, 1414.3, 1440.02, 1448.04, 1452.08, 1464.7, 1401.9, 1412.92, 1420.74,
                        1446.47, 1452.54, 1434.12, 1424.64, 1450.66, 1463.98, 1432.7, 1441.1, 1362.54, 1397.17, 1418.05, 1442.0, 1469.93, 1499.65, 1489.92, 1503.6, 1518.66, 1539.01, 1512.23, 1520.86, 1516.88, 1514.92, 1516.85, 1563.84,
                        1555.92, 1564.85, 1516.75, 1508.21, 1529.43, 1503.65, 1523.51, 1538.37, 1487.95, 1482.76, 1473.3, 1479.09, 1504.95, 1498.37, 1496.82, 1480.54, 1507.24, 1516.65, 1504.63, 1516.24, 1555.78, 1544.61, 1576.25, 1575.57,
                        1585.15, 1605.85, 1644.13, 1628.52, 1639.43, 1629.53, 1655.08, 1717.39, 1629.51, 1581.21, 1523.6, 1547.23, 1526.05, 1515.76, 1508.83, 1535.12, 1512.09, 1487.04, 1451.09, 1430.14, 1459.82, 1409.39, 1422.86, 1439.06,
                        1458.66, 1466.02, 1465.6, 1487.9, 1455.6, 1482.83, 1451.02, 1459.14, 1483.43, 1510.45, 1564.59, 1567.07, 1563.44, 1555.47, 1567.7, 1529.95, 1551.08, 1585.99, 1606.66, 1632.98, 1584.29, 1598.88, 1510.8, 1556.88,
                        1616.11, 1624.32, 1645.66, 1745.85, 1762.5, 1759.73, 1761.42, 1737.72, 1747.23, 1742.82, 1772.26, 1774.03, 1761.66, 1740.64, 1758.57, 1736.38, 1727.56, 1763.9, 1764.13, 1787.02, 1754.4, 1795.36, 1824.97, 1821.84,
                        1823.76, 1817.03, 1811.33, 1777.86, 1767.65, 1774.8, 1752.26, 1761.08, 1757.19, 1740.51, 1726.22, 1734.56, 1720.22, 1728.23, 1734.16, 1773.96, 1757.76, 1736.25, 1752.64, 1726.13, 1740.05, 1722.88, 1774.34, 1797.83,
                        1756.29, 1737.43, 1747.25, 1730.92, 1727.62, 1784.47, 1880.07, 1884.15, 1892.56, 1894.28, 1907.95, 1818.94, 1853.2, 1827.36, 1893.07, 1919.12, 2058.88, 2053.63, 2088.83, 2084.52, 2075.39, 2086.48, 2088.75, 2095.03,
                        2110.7, 2118.62, 2105.81, 2088.81, 2054.26, 2060.12, 2083.81, 2015.95]


'''
FORMAT:
    {"dataMethod":"upload" OR "config",
     "analysisMethod": "STFT" OR "EMD",
     if (dataMethod == upload){
     "signalData": [[r1, r2], [r1, r2]]
     else
     "signals":
     ["1":{id:"1", type:"sinsusoid", etc}...]
'''

def analysis_runner(data):
    data = json.loads(data)
    time_series = [] 
    if (data['dataMethod'] == 'upload'):
        if (data['analysisMethod'] == 'STFT'):
            nperseg = int(data['nperseg'])
            fs = 1/(data['signalData'][1][0] - data['signalData'][0][0])
            #fs = 1e4
            time_series = [x[1] for x in data['signalData']]
            before_html = plot_one(time_series, "Time", "Amplitude", "Line plot before STFT Analysis", fs=fs)
            stft_data = stft_analysis(time_series, fs, nperseg=nperseg)
            return json.dumps({'stft_data': stft_data, 'before_html':before_html})
        if (data['analysisMethod'] == 'EMD'):
            time_series = [x[1] for x in data['signalData']]
            before_html = plot_one(time_series, "Time", "Amplitude", "Line plot before EMD Analysis")
            output_html = emd_analysis(np.array(time_series))
            return json.dumps({'output_html': output_html, 'before_html': before_html})
    elif (data['dataMethod'] == 'config'):
        comb_method = data['combinationMethod']
        time_series = process_input(data)
        time_series = np.array(time_series)
        #before_html = plot_many(np.array(np.array(time_series)).transpose(), comb_method=comb_method, fs=10e3)
        if comb_method  == 'product':
            time_series = np.prod(time_series, axis=0)
        else:
            time_series = np.sum(time_series, axis=0)
        if (data['analysisMethod'] == 'STFT'):
            stft_data = stft_analysis(time_series, fs=10e3)
            return json.dumps({'stft_data': stft_data, 'before_html':before_html})
        if (data['analysisMethod'] == 'EMD'):
            output_html = emd_analysis(time_series)
            return json.dumps({'output_html': output_html, 'before_html': '<div></div>'})
        #tmp = {'before_html': html}
        #return json.dumps({'html': html })


def emd_analysis(x):
#    imfs = {i:arr.tolist() for i, arr in enumerate(np.swapaxes(imf, 0, 1))}
    #return json.dumps({i:arr.tolist() for i, arr in enumerate(imfs)})
    imf = emd.sift.sift(x)
    fig = plot_ts(imf, scale_y=True, cmap=True)
    return mpld3.fig_to_html(fig)


def stft_analysis(x, fs=1, nperseg=1000):
    amp = 2 * np.sqrt(2)
    f, t, Zxx = signal.stft(x, fs, nperseg=nperseg)
    zmin = abs(Zxx)[np.unravel_index(abs(Zxx).argmin(), abs(Zxx).shape)]
    zmax = abs(Zxx)[np.unravel_index(abs(Zxx).argmax(), abs(Zxx).shape)]
    zRange = [zmin, zmax] 
    freqStep = f[1] - f[0]
    freqRange = [f[f.argmin()],f[f.argmax()]]
    timeStep = t[1] - t[0]
    timeRange = [t[t.argmin()],t[t.argmax()]]
    values = [{'values':z, 'time':ti} for (z, ti) in zip(abs(Zxx), t)]
    values = [{'values':[{'freq':fr, 'z':z} for (fr, z) in zip(f,Z)], 'time':ti} for (Z, ti) in zip(abs(Zxx), t)]
    # the ugliest thing i have ever written i'm so sorry
    values = [{'values':[{'freq':fr, 'z':z} for (fr, z) in zip(f,Z)], 'time':ti} for (Z, ti) in zip(abs(np.swapaxes(Zxx,0, 1)), t)]
    #ungodly = {'freqStep': freqStep, 'freqRange':freqRange, 'timeStep':timeStep, 'timeRange':timeRange, 'zRange':zRange, 'values':values}
    #return json.dumps({'stft_data':ungodly, 'before_html':before_html})
    return {'freqStep': freqStep, 'freqRange':freqRange, 'timeStep':timeStep, 'timeRange':timeRange, 'zRange':zRange, 'values':values}


def plot_many(xs, comb_method='sum', fs=1):
    fig = plot_ts(xs, is_imf=False, comb_method=comb_method, scale_y=True, cmap=True, sample_rate=fs)
    return mpld3.fig_to_html(fig) 


def plot_one(x, x_label, y_label, title, fs=1):
    y = None
    if fs != 1:
        y = np.arange(len(x))/float(fs)

    plt.figure(figsize=(10, 3))
    plt.xlabel(x_label)
    plt.ylabel(y_label)
    plt.title(title)
    if y is None:
        plt.plot(x)
    else:
        plt.plot(y,x)

    return mpld3.fig_to_html(plt.gcf())


def test_stft_analysis():
    rng = np.random.default_rng()
    fs = 10e3
    N = 1e5
    amp = 2 * np.sqrt(2)
    noise_power = 0.01 * fs / 2
    time = np.arange(N) / float(fs)
    mod = 500*np.cos(2*np.pi*0.25*time)
    carrier = amp * np.sin(2*np.pi*3e3*time + mod)
    noise = rng.normal(scale=np.sqrt(noise_power),
                       size=time.shape)
    noise *= np.exp(-time/5)
    x = carrier + noise
    return stft_analysis(x)
#

def test_emd_analysis():
    sample_rate = 1000
    seconds = 10
    num_samples = sample_rate*seconds

    time_vect = np.linspace(0, seconds, num_samples)

    freq = 5

    # Change extent of deformation from sinusoidal shape [-1 to 1]
    nonlinearity_deg = 0.25

    # Change left-right skew of deformation [-pi to pi]
    nonlinearity_phi = -np.pi/4

    # Compute the signal

    # Create a non-linear oscillation
    x = emd.simulate.abreu2010(freq, nonlinearity_deg, nonlinearity_phi, sample_rate, seconds)

    x += np.cos(2 * np.pi * 1 * time_vect)        # Add a simple 1Hz sinusoid
    x -= np.sin(2 * np.pi * 2.2e-1 * time_vect) 
    return emd_analysis(x)


# adapted from the emd library's implementation of `plot_imfs`
def plot_ts(xs, is_imf=True, comb_method='sum', time_vect=None, sample_rate=1, scale_y=False, freqs=None, cmap=None, fig=None):
    nplots = xs.shape[1] + 1
    if time_vect is None:
        time_vect = np.linspace(0, xs.shape[0]/sample_rate, xs.shape[0])

    mx = np.abs(xs).max()
    mx_sig = np.abs(xs.sum(axis=1)).max()

    if fig is None:
        fig = plt.figure()

    ax = fig.add_subplot(nplots, 1, 1)
    if scale_y:
        ax.yaxis.get_major_locator().set_params(integer=True)
    for tag in ['top', 'right', 'bottom']:
        ax.spines[tag].set_visible(False)
    ax.plot((time_vect[0], time_vect[-1]), (0, 0), color=[.5, .5, .5])
    if comb_method == 'sum':
        ax.plot(time_vect, xs.sum(axis=1), 'k')
    else:
        ax.plot(time_vect, xs.prod(axis=1), 'k')
    ax.tick_params(axis='x', labelbottom=False)
    ax.set_xlim(time_vect[0], time_vect[-1])
    ax.set_ylim(-mx_sig * 1.1, mx_sig * 1.1)
    ax.set_ylabel('Signal', rotation=0, labelpad=10)

    if cmap is True:
        # Use default colormap
        cmap = plt.cm.Dark2
        cols = cmap(np.linspace(0, 1, xs.shape[1] + 1))
    elif isinstance(cmap, Colormap):
        # Use specified colormap
        cols = cmap(np.linspace(0, 1, xs.shape[1] + 1))
    else:
        # Use all black lines - this is overall default
        cols = np.array([[0, 0, 0] for ii in range(xs.shape[1] + 1)])

    for ii in range(1, nplots):
        ax = fig.add_subplot(nplots, 1, ii + 1)
        for tag in ['top', 'right', 'bottom']:
            ax.spines[tag].set_visible(False)
        ax.plot((time_vect[0], time_vect[-1]), (0, 0), color=[.5, .5, .5])
        ax.plot(time_vect, xs[:, ii - 1], color=cols[ii, :])
        ax.set_xlim(time_vect[0], time_vect[-1])
        if scale_y:
            ax.set_ylim(-mx * 1.1, mx * 1.1)
            ax.yaxis.get_major_locator().set_params(integer=True)
        if is_imf:
            ax.set_ylabel('IMF {0}'.format(ii), rotation=0, labelpad=10)
        else:
            ax.set_ylabel('{0}'.format(ii), rotation=0, labelpad=10)


        if ii < nplots - 1:
            ax.tick_params(axis='x', labelbottom=False)
        else:
            ax.set_xlabel('Time')
        if freqs is not None:
            ax.set_title(freqs[ii - 1], fontsize=8)

    fig.subplots_adjust(top=.95, bottom=.1, left=.2, right=.99)
    return fig

def simple_sin(frequency, amplitude, phase, time):
    #time = np.linspace(0, 2 * np.pi, time_points)
    time_series = np.sin((time) * 2 * np.pi * frequency + phase) * amplitude
    return time, time_series

def chirp(init_freq, chirp_rate, amplitude, time):
    #time = np.linspace(0, 1, time_points)
    time_series = signal.chirp(time, init_freq, 1, chirp_rate) * amplitude
    return time, time_series
    
def poisson_noise(seed, time):
    np.ranomd.seed(seed)
    #time = np.linspace(0, time_frame)
    s = np.random.poisson(1, time_frame)
    return time, s

def linear_trend(alpha, beta, gamma, time):
    #time = np.linspace(0, 1, time_points)
    norm_time = [alpha for x in time]
    linear_series = [x * norm_time[i] for i, x in enumerate(time)]
    return time, linear_series

def exponential_trend(alpha, beta, gamma,time):
    #time = np.linspace(0, 1, time_points)
    norm_time = [x ** alpha for x in time]
    largest = max(norm_time)
    linear_series = [(x * norm_time[i])/largest * beta for i, x in enumerate(time)]
    return time, linear_series

def polynomial_trend(alpha, beta, gamma,time):
    #time = np.linspace(0, 5, time_points)
    polynomial_series = [(alpha * (x**2)) + (x * beta) + gamma for x in time]
    return time, polynomial_series

def white_noise(seed, amplitude, variance, N):
    np.random.seed(seed)
    X_white = np.fft.rfft(np.random.randn(N))
    S = 1
    S = amplitude / np.sqrt(np.mean(1**2))
    X_shaped = X_white * S
    return np.fft.irfft(X_shaped)

def blue_noise(seed, amplitude, variance, N):
    np.random.seed(seed)
    X_white = np.fft.rfft(np.random.randn(N))
    S = np.sqrt(np.fft.rfftfreq(N))
    S = (S * amplitude) / np.sqrt(np.mean(S**2))
    X_shaped = X_white * S
    return np.fft.irfft(X_shaped)

def violet_noise(seed, amplitude, variance, N):
    np.random.seed(seed)
    X_white = np.fft.rfft(np.random.randn(N))
    S = np.fft.rfftfreq(N)
    S = (S * amplitude)  / np.sqrt(np.mean(S**2))
    X_shaped = X_white * S
    return np.fft.irfft(X_shaped)

def brownian_noise(seed, amplitude, variance, N):
    np.random.seed(seed)
    X_white = np.fft.rfft(np.random.randn(N))
    S = 1/np.where(np.fft.rfftfreq(N) == 0, float('inf'), np.fft.rfftfreq(N)) 
    S = (S * amplitude) / np.sqrt(np.mean(S**2))
    X_shaped = X_white * S
    return np.fft.irfft(X_shaped)

def pink_noise(seed, amplitude, variance, N):
    np.random.seed(seed)
    X_white = np.fft.rfft(np.random.randn(N))
    S = 1/np.where(np.fft.rfftfreq(N) == 0, float('inf'), np.sqrt(np.fft.rfftfreq(N))) 
    S = (S * amplitude)  / np.sqrt(np.mean(S**2))
    X_shaped = X_white * S
    return np.fft.irfft(X_shaped)

def process_input(params):
    fs = 10e3
    N = 1e5
    time_points = np.arange(N) / float(fs)
 
    input_signals = []
    for signal in params["signals"]:
        if(signal["type"]) == "sinusoid":
            _, time_series = simple_sin(float(signal["frequency"]), float(signal["amplitude"]), float(signal["phase"]), time_points)

        if(signal["type"]) == "chirp":
            _, time_series = chirp(float(signal["frequency"]), float(signal["rate"]), float(signal["amplitude"]), time_points)

        if(signal["type"]) == "trend":
            if(signal["trendType"] == "linear"):
                _, time_series = linear_trend(float(signal["alpha"]), float(signal["beta"]), float(signal["gamma"]), time_points)
            if(signal["trendType"] == "exponential"):
                _, time_series = exponential_trend(float(signal["alpha"]), float(signal["beta"]), float(signal["gamma"]), time_points)
            if(signal["trendType"] == "polynomial"):
                _, time_series = polynomial_trend(float(signal["alpha"]), float(signal["beta"]), float(signal["gamma"]), time_points)

        if(signal["type"]) == "colour-noise":
            if(signal["colour"] == "white"):
                time_series = white_noise(int(signal["seed"]), float(signal["amprollfactor"]), float(signal["variance"]), int(N))
            if(signal["colour"] == "brownian"):
                time_series = brownian_noise(int(signal["seed"]), float(signal["amprollfactor"]), float(signal["variance"]), int(N))
            if(signal["colour"] == "blue"):
                time_series = blue_noise(int(signal["seed"]), float(signal["amprollfactor"]), float(signal["variance"]), int(N))
            if(signal["colour"] == "violet"):
                time_series = violet_noise(int(signal["seed"]), float(signal["amprollfactor"]), float(signal["variance"]), int(N))
            if(signal["colour"] == "pink"):
                time_series = pink_noise(int(signal["seed"]), float(signal["amprollfactor"]), float(signal["variance"]), int(N))
        
        if(signal["type"]) == "shot-noise":
            _, time_series = poisson_noise(int(signal["seed"]), time_points)
        if(signal["type"]) == "finance-data":
            time_series = GOOGL_FINANCIAL_DATA
        
        input_signals.append(time_series)
        
    return input_signals




class FuncContainer(object):
    pass

py_funcs = FuncContainer()
py_funcs.stft_analysis = stft_analysis
py_funcs.emd_analysis = emd_analysis
py_funcs.test_emd_analysis = test_emd_analysis
py_funcs.test_stft_analysis = test_stft_analysis
py_funcs.analysis_runner = analysis_runner

# pyodide returns last statement as an object that is assessable from javascript
py_funcs
