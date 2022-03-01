import numpy as np
import io, base64		
from js import params

def create_line():
    return np.linspace(0, 2, 2 * int(params[0])).tolist()

return_val = ''.join((str(e) + "::") for e in create_line())

return_val
