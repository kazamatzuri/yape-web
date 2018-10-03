from setuptools import setup

setup(name='yape-web',
      version='1.0',
      description='YAPE - Web',
      url='https://github.com/murrayo/yape',
      author='Fabian',
      author_email='fab@intersystems.com',
      license='MIT',
      install_requires=['flask-cors>=3.0.6',
      'SQLAlchemy>=1.2.12',
      'psycopg2-binary>=2.7.5',
      'marshmallow>=2.15.6',
      'python-jose>=3.0.1'
      ],
      zip_safe=False)
