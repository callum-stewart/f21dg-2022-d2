import matplotlib.pyplot as plt
import json
import numpy as np
import emd
import pandas as pd
from scipy import signal
import mpld3

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
x -= np.sin(2 * np.pi * 2.2e-1 * time_vect)   # Add part of a very slow cycle as a trend

t = np.arange(0, seconds, 1/sample_rate)

data = pd.DataFrame({"time":t, "amp":x})
data.to_csv("emd_sample.csv", sep=",", float_format='%.6f',index=False, line_terminator='\n',encoding='utf-8')


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

data = pd.DataFrame({"time":time, "amp":x})
data.to_csv("stft_sample.csv", sep=",", float_format='%.15f',index=False, line_terminator='\n',encoding='utf-8')

#data = pd.read_csv("stft_sample.csv")

#f, t, Zxx = signal.stft(x, fs, nperseg=1000)
#data = pd.DataFrame(abs(Zxx))
#data.to_csv("stft_zxx.csv", sep=",", float_format='%.15f',index=False, line_terminator='\n',encoding='utf-8')

#plt.figure(figsize=(12,4))
#plt.plot(x)
#plt.show()
#imf = emd.sift.sift(x)
#emd.plotting.plot_imfs(imf, scale_y=True, cmap=True)



#f, t, Zxx = signal.stft(x, fs, nperseg=1000)
#plt.pcolormesh(t, f, np.abs(Zxx), shading='gouraud')
#plt.title('STFT Magnitude')
#plt.ylabel('Frequency [Hz]')
#plt.xlabel('Time [sec]')
#plt.show()
#zmin = abs(Zxx)[np.unravel_index(abs(Zxx).argmin(), abs(Zxx).shape)]
#zmax = abs(Zxx)[np.unravel_index(abs(Zxx).argmax(), abs(Zxx).shape)]
#zRange = [zmin, zmax] 
#freqStep = f[1] - f[0]
#freqRange = [f[f.argmin()],f[f.argmax()]]
#timeStep = t[1] - t[0]
#timeRange = [t[t.argmin()],t[t.argmax()]]
#values = [{'values':z, 'time':ti} for (z, ti) in zip(abs(Zxx), t)]
#values = [{'values':[{'freq':fr, 'z':z} for (fr, z) in zip(f,Z)], 'time':ti} for (Z, ti) in zip(abs(Zxx), t)]
# the ugliest thing i have ever written i'm so sorry
#values = [{'values':[{'freq':fr, 'z':z} for (fr, z) in zip(f,Z)], 'time':ti} for (Z, ti) in zip(abs(np.swapaxes(Zxx,0, 1)), t)]
#ungodly = {'freqStep': freqStep, 'freqRange':freqRange, 'timeStep':timeStep, 'timeRange':timeRange, 'zRange':zRange, 'values':values}
#print(json.dumps(ungodly))
