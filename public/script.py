import micropip
import os
os.environ['MPLBACKEND'] = 'AGG'
import numpy as np
import io, base64, json
from scipy import signal
from pyhht import EMD
import matplotlib.pyplot as plt
import mpld3

def emd_analysis(N):
    t = np.linspace(0, 1, N)    
    modes = np.sin(2 * np.pi * 5 * t) + np.sin(2 * np.pi * 10 * t)    
    x = modes + t    
    decomposer = EMD(x)    
    imfs = decomposer.decompose()
    #imf = imf = emd.sift.sift(x)
#    imfs = {i:arr for i, arr in enumerate(np.swapaxes(imf, 0, 1))}
    return json.dumps({i:arr.tolist() for i, arr in enumerate(imfs)})

def stft_analysis(N):
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
#
    f, t, Zxx = signal.stft(x, fs, nperseg=1000)
    plt.pcolormesh(t, f, np.abs(Zxx), vmin=0, vmax=amp, shading='gouraud')
    plt.title('STFT Magnitude')
    plt.ylabel('Frequency [Hz]')
    plt.xlabel('Time [sec]')
    mpld3.fig_to_html(plt.gcf())
    #{'Zxx':abs(Zxx).tolist()}
    return json.dumps(mpld3.fig_to_html(plt.gcf()))

class FuncContainer(object):
    pass

py_funcs = FuncContainer()
py_funcs.stft_analysis = stft_analysis
py_funcs.emd_analysis = emd_analysis

# pyodide returns last statement as an object that is assessable from javascript
py_funcs
