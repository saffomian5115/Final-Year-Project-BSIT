# patch_face_recognition_models.py
import sys
import os
from pathlib import Path

# Fix for pkgutil.ImpImporter in Python 3.12+
import pkgutil
if not hasattr(pkgutil, 'ImpImporter'):
    # Create a compatibility class
    class ImpImporter:
        def __init__(self, path=None):
            self.path = path
        
        def find_module(self, fullname):
            return None
    
    pkgutil.ImpImporter = ImpImporter

print("Patch applied successfully!")