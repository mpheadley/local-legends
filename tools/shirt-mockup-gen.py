#!/usr/bin/env python3
"""
shirt-mockup-gen.py — wrapper for this project.
Delegates to the central script at /Volumes/Samsung_T5/webdev/tools/shirt-mockup-gen.py
"""
import sys, os
sys.argv[0] = os.path.realpath(__file__)
exec(open("/Volumes/Samsung_T5/webdev/tools/shirt-mockup-gen.py").read())
