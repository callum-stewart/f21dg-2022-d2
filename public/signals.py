from js import params
import numpy as np
import json
from scipy import signal as sig
from random import gauss
from random import seed
from pandas import Series

def simple_sin(frequency, amplitude, phase, time_points):
    time = np.linspace(0, 2 * np.pi, time_points)
    time_series = np.sin((time + phase) * frequency) * amplitude
    return time, time_series

def chirp(init_freq, chirp_rate, amplitude, time_points):
    time = np.linspace(0, 1, time_points)
    time_series = sig.chirp(time, init_freq, 1, chirp_rate) * amplitude
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

def process_input(params):
    json_object = json.loads(params)
    
    time_points = 1000
    if(json_object["comb-method"] == "sum"):
        data = [0] * time_points
    else:
        data = [1] * time_points
        
    for signal in json_object["signals"]:
        if(signal["type"]) == "sinusoid":
            print(float(signal["phase"]))
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
                time_series = white_noise(int(signal["seed"]), float(signal["amprollfactor"]), float(signal["variance"]), time_points)
            if(signal["colour"] == "brownian"):
                time_series = brownian_noise(int(signal["seed"]), float(signal["amprollfactor"]), float(signal["variance"]), time_points)
            if(signal["colour"] == "blue"):
                time_series = blue_noise(int(signal["seed"]), float(signal["amprollfactor"]), float(signal["variance"]), time_points)
            if(signal["colour"] == "violet"):
                time_series = violet_noise(int(signal["seed"]), float(signal["amprollfactor"]), float(signal["variance"]), time_points)
            if(signal["colour"] == "pink"):
                time_series = pink_noise(int(signal["seed"]), float(signal["amprollfactor"]), float(signal["variance"]), time_points)
        
        if(signal["type"]) == "shot-noise":
            _, time_series = poisson_noise(int(signal["seed"]), time_points)
        if(signal["type"]) == "finance-data":
            pass
        
        if(json_object["comb-method"] == "sum"):
            print(str(len(time_series)) + " " + signal["type"])
            data = [data[i] + time_series[i] for i in range(0, time_points)]
        else:
            data = [data[i] * time_series[i] for i in range(0, time_points)]
        
    return data