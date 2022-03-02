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
    
def white_noise(amplitude, n_seed, time_points):
    time = np.linspace(0, 1, time_points)
    seed(n_seed)
    series = [gauss(0.0, amplitude) for i in range(time_points)]
    series = Series(series)
    return time, series
    
def poisson_noise(amplitude, time_frame):
    time = np.linspace(0, time_frame)
    s = np.random.poisson(amplitude, time_frame)
    return time, s

def linear_sin(frequency, amplitude, phase, time_points):
    time = np.linspace(0, 2 * np.pi, time_points)
    time_series = np.sin((time + phase) * frequency) * amplitude

    largest = max(time)
    norm_time = [x / largest for x in time]

    linear_series = [x * norm_time[i] for i, x in enumerate(time_series)]
    return time, linear_series

# Signal Generation
input_data = json.loads(params)

# sinusoid | chirp | trend | white | coloured | poisson | financial
# Sinusoid signal - Input = Frequency(), Amplitude(), Phase(), TimeFrame()
if(input_data["signal_type"] == "sinusoid"):
    # Values from browser
    frequency = input_data["signal_values"]["frequency"]
    amplitude = input_data["signal_values"]["amplitude"]
    phase = input_data["signal_values"]["phase"]
    time_frame = input_data["signal_values"]["time_frame"]
    # Input checks
    time, time_series = simple_sin(frequency, amplitude, phase, time_frame)
    return_object = {
        "success" : True,
        "sig_time" : time.tolist(),
        "sig_data" : time_series.tolist()
    }
# Chirp signal - Input = InitalFrequency(), ChirpRate(), Amplitude(), TimeFrame()
elif(input_data["signal_type"] == "chirp"):
    # Values from browser
    init_freq = input_data["signal_values"]["frequency"]
    chirp_rate = input_data["signal_values"]["phase"]
    amplitude = input_data["signal_values"]["amplitude"]
    time_frame = input_data["signal_values"]["time_frame"]
    # Input checks
    time, time_series = chirp(init_freq, chirp_rate, amplitude, time_frame)
    return_object = {
        "success" : True,
        "sig_time" : time.tolist(),
        "sig_data" : time_series.tolist()
    }
# Trend signal - Input = TrendType(Exponential, Linear, Polynomial), coefficient1(), coefficient2(), coefficient3(), TimeFrame()
elif(input_data["signal_type"] == "trend"):
    # Values from browser
    coefficient1 = input_data["signal_values"]["coefficient1"]
    coefficient2 = input_data["signal_values"]["coefficient2"]
    coefficient3 = input_data["signal_values"]["coefficient3"]
    time_frame = input_data["signal_values"]["time_frame"]
    # Input checks
    if(input_data["signal_values"]["trend_type"] == "exponentional"):
        pass # TODO
    elif(input_data["signal_values"]["trend_type"] == "linear"):
        time, time_series = linear_sin(10, 1, 0, 1000)
        return_object = {
            "success" : True,
            "sig_time" : time.tolist(),
            "sig_data" : time_series.tolist()
        }
    elif(input_data["signal_values"]["trend_type"] == "polynomial"):
        pass # TODO
    else:
        return_object = {
            "success" : False,
            "reason" : "Invalid Trend Type"
        }
    
# White Noise signal - Input = Seed(), Amplitude(), TimeFrame()
elif(input_data["signal_type"] == "white"):
    # Values from browser
    noise_seed = input_data["signal_values"]["noise_seed"]
    amplitude = input_data["signal_values"]["amplitude"]
    time_frame = input_data["signal_values"]["time_frame"]
    # Input checks
    time, time_series = white_noise(noise_seed, amplitude, time_frame)
    return_object = {
        "success" : True,
        "sig_time" : time.tolist(),
        "sig_data" : time_series.tolist()
    }
# Coloured Noise signal - Input = Frequency(), Amplitude(), Phase(), TimeFrame()
elif(input_data["signal_type"] == "coloured"):
    # Values from browser
    frequency = input_data["signal_values"]["frequency"]
    amplitude = input_data["signal_values"]["amplitude"]
    phase = input_data["signal_values"]["phase"]
    time_frame = input_data["signal_values"]["time_frame"]
    # Input checks
    return_object = { # TODO
        "success" : True,
        "sig_time" : time.tolist(),
        "sig_data" : time_series.tolist()
    }
# Poisson Noise signal - Input = Amplitude(), TimeFrame()
elif(input_data["signal_type"] == "poisson"):
    # Values from browser
    amplitude = input_data["signal_values"]["amplitude"]
    time_frame = input_data["signal_values"]["time_frame"]
    # Input checks
    time, time_series = poisson_noise(amplitude, time_frame)
    return_object = {
        "success" : True,
        "sig_time" : time.tolist(),
        "sig_data" : time_series.tolist()
    }
# Financial signal - Input = CompanyTicker(), TimeFrame()
elif(input_data["signal_type"] == "financial"):
    # Values from browser
    ticker = input_data["signal_values"]["ticker"]
    time_frame = input_data["signal_values"]["time_frame"]
    # Input checks
    return_object = { # TODO
        "success" : True,
        "sig_time" : time.tolist(),
        "sig_data" : time_series.tolist()
    }
else:
    #if not return_object:
    return_object = {
        "success" : False,
        "reason" : "Invalid input signal"
    }

json.dumps(return_object)
