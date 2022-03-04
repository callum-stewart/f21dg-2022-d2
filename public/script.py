import micropip
import os
os.environ['MPLBACKEND'] = 'AGG'
import numpy as np
import io, base64, json
from scipy import signal
from pyhht import EMD
import matplotlib.pyplot as plt
import mpld3
import emd

def emd_analysis(x):
    imf = emd.sift.sift(x)
#    imfs = {i:arr.tolist() for i, arr in enumerate(np.swapaxes(imf, 0, 1))}
    fig = plot_imfs(imf, scale_y=True, cmap=True)
    #return json.dumps({i:arr.tolist() for i, arr in enumerate(imfs)})
    return mpld3.fig_to_html(fig)

def stft_analysis(x):
    amp = 2 * np.sqrt(2)
    f, t, Zxx = signal.stft(x, nperseg=1000)
    plt.pcolormesh(t, f, np.abs(Zxx), vmin=0, vmax=amp, shading='gouraud')
    plt.title('STFT Magnitude')
    plt.ylabel('Frequency [Hz]')
    plt.xlabel('Time [sec]')
    mpld3.fig_to_html(plt.gcf())
    #{'Zxx':abs(Zxx).tolist()}
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


def plot_imfs(imfs, time_vect=None, sample_rate=1, scale_y=False, freqs=None, cmap=None, fig=None):
    nplots = imfs.shape[1] + 1
    if time_vect is None:
        time_vect = np.linspace(0, imfs.shape[0]/sample_rate, imfs.shape[0])

    mx = np.abs(imfs).max()
    mx_sig = np.abs(imfs.sum(axis=1)).max()

    if fig is None:
        fig = plt.figure()

    ax = fig.add_subplot(nplots, 1, 1)
    if scale_y:
        ax.yaxis.get_major_locator().set_params(integer=True)
    for tag in ['top', 'right', 'bottom']:
        ax.spines[tag].set_visible(False)
    ax.plot((time_vect[0], time_vect[-1]), (0, 0), color=[.5, .5, .5])
    ax.plot(time_vect, imfs.sum(axis=1), 'k')
    ax.tick_params(axis='x', labelbottom=False)
    ax.set_xlim(time_vect[0], time_vect[-1])
    ax.set_ylim(-mx_sig * 1.1, mx_sig * 1.1)
    ax.set_ylabel('Signal', rotation=0, labelpad=10)

    if cmap is True:
        # Use default colormap
        cmap = plt.cm.Dark2
        cols = cmap(np.linspace(0, 1, imfs.shape[1] + 1))
    elif isinstance(cmap, Colormap):
        # Use specified colormap
        cols = cmap(np.linspace(0, 1, imfs.shape[1] + 1))
    else:
        # Use all black lines - this is overall default
        cols = np.array([[0, 0, 0] for ii in range(imfs.shape[1] + 1)])

    for ii in range(1, nplots):
        ax = fig.add_subplot(nplots, 1, ii + 1)
        for tag in ['top', 'right', 'bottom']:
            ax.spines[tag].set_visible(False)
        ax.plot((time_vect[0], time_vect[-1]), (0, 0), color=[.5, .5, .5])
        ax.plot(time_vect, imfs[:, ii - 1], color=cols[ii, :])
        ax.set_xlim(time_vect[0], time_vect[-1])
        if scale_y:
            ax.set_ylim(-mx * 1.1, mx * 1.1)
            ax.yaxis.get_major_locator().set_params(integer=True)
        ax.set_ylabel('IMF {0}'.format(ii), rotation=0, labelpad=10)

        if ii < nplots - 1:
            ax.tick_params(axis='x', labelbottom=False)
        else:
            ax.set_xlabel('Time')
        if freqs is not None:
            ax.set_title(freqs[ii - 1], fontsize=8)

    fig.subplots_adjust(top=.95, bottom=.1, left=.2, right=.99)
    return fig




class FuncContainer(object):
    pass

py_funcs = FuncContainer()
py_funcs.stft_analysis = stft_analysis
py_funcs.emd_analysis = emd_analysis
py_funcs.test_emd_analysis = test_emd_analysis
py_funcs.test_stft_analysis = test_stft_analysis

# pyodide returns last statement as an object that is assessable from javascript
py_funcs
