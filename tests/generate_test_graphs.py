#import micropip
import os
#os.environ['MPLBACKEND'] = 'AGG'
import numpy as np
import io, base64, json
from scipy import signal
import matplotlib.pyplot as plt
import mpld3
import emd
from random import gauss
from random import seed
from pandas import Series
import pdb


def simple_sin(frequency, amplitude, phase, time_points):
    #time = np.linspace(0, 2 * np.pi, time_points)
    time = time_points
    time_series = np.sin((time + phase) * frequency) * amplitude
    return time, time_series

def chirp(init_freq, chirp_rate, amplitude, time_points):
    #time = np.linspace(0, 1, time_points)
    time = time_points
    time_series = signal.chirp(time, init_freq, 1, chirp_rate) * amplitude
    return time, time_series
    
def poisson_noise(seed, time_frame):
    np.ranomd.seed(seed)
    time = np.linspace(0, time_frame)
    s = np.random.poisson(1, time_frame)
    return time, s

def linear_trend(alpha, beta, gamma, time_points):
    time = np.linspace(0, 1, time_points)
    norm_time = [alpha for x in time]
    linear_series = [x * norm_time[i] for i, x in enumerate(time)]
    return time, linear_series

def exponential_trend(alpha, beta, gamma,time_points):
    time = np.linspace(0, 1, time_points)
    norm_time = [x ** alpha for x in time]
    largest = max(norm_time)
    linear_series = [(x * norm_time[i])/largest * beta for i, x in enumerate(time)]
    return time, linear_series

def polynomial_trend(alpha, beta, gamma,time_points):
    time = np.linspace(0, 5, time_points)
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
    return plt


fs = 10e3
N = 1e5
time = np.arange(N) / float(fs)
#pdb.set_trace()
x = np.sum(np.concatenate((simple_sin(20,1, 0, time)[1], simple_sin(40,2, 0, time)[1], chirp(0, 100, 1, time)[1]), axis=0).reshape(3,100000), axis=0)

plt = plot_one(x, "Time", "Frequency", "TvF", fs=fs)
plt.show()

f, t, Zxx = signal.stft(x, fs, nperseg=1000)
amp = 2 * np.sqrt(2)
plt.pcolormesh(t, f, np.abs(Zxx), vmin=0, vmax=amp, shading='gouraud')
plt.title('STFT Magnitude')
plt.ylabel('Frequency [Hz]')
plt.xlabel('Time [sec]')
plt.show()

