#Installation

you'll need pipenv and python3. then cd into the api directory (same dir as the readme is) and run:
```
pipenv install
```


You might need to do this:

```ImportError: Python is not installed as a framework. The Mac OS X backend will not be able to function correctly if Python is not installed as a framework. See the Python documentation for more information on installing Python as a framework on Mac OS X. Please either reinstall Python as a framework, or try one of the other backends. If you are using (Ana)Conda please install python.app and replace the use of 'python' with 'pythonw'. See 'Working with Matplotlib on OSX' in the Matplotlib FAQ for more information.
```
--->
```
I resolved this error by following the instructions in this answer while also using this document to find where the matplotlibrc file is located.

To do this inside my pipenv I ran the following code:

python
>>> import matplotlib
>>> matplotlib.matplotlib_fname()
Using the output I navigated to the matplotlibrc file within my virtual environment and added backend: TkAgg to the file.
```
