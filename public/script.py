import numpy as np
import io, base64, json
from scipy import signal
#import matplotlib.pyplot as plt

def stft_analysis(N):
    rng = np.random.default_rng()
    #N = 1000
    fs = 10e3
    #N = 1e2
    amp = 2 * np.sqrt(2)
    noise_power = 0.01 * fs / 2
    time = np.arange(N) / float(fs)
    mod = 500*np.cos(2*np.pi*0.25*time)
    carrier = amp * np.sin(2*np.pi*3e3*time + mod)
    noise = rng.normal(scale=np.sqrt(noise_power),
                       size=time.shape)
    noise *= np.exp(-time/5)
    x = carrier + noise
#
    f, t, Zxx = signal.stft(x, fs, nperseg=1000)
    return json.dumps({'Zxx':Zxx})

rng = np.random.default_rng()
#N = 1000
fs = 10e3
N = 1e2
amp = 2 * np.sqrt(2)
noise_power = 0.01 * fs / 2
time = np.arange(N) / float(fs)
mod = 500*np.cos(2*np.pi*0.25*time)
carrier = amp * np.sin(2*np.pi*3e3*time + mod)
noise = rng.normal(scale=np.sqrt(noise_power),
                   size=time.shape)
noise *= np.exp(-time/5)
x = carrier + noise

f, t, Zxx = signal.stft(x, fs, nperseg=1000)

return_val = ''.join((str(e) + ',') for e in abs(Zxx))
return_val


