'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import Image from 'next/image';

function ProfileDialog({ onClose }) {
  const [user, setUser] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const updateUser = useMutation(api.users.updateUser);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setPreviewURL(parsed.photoURL || '');
    }
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!user?.email) {
      toast.error('User not loaded');
      return;
    }

    let base64Image = previewURL;

    if (photoFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        base64Image = reader.result;

        await updateUser({
          email: user.email,
          name: user.name,
          photo: base64Image,
        });

        const updatedUser = {
          ...user,
          photoURL: base64Image,
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success('Profile updated!');
        if (onClose) onClose(); // close dialog
      };
      reader.readAsDataURL(photoFile);
    } else {
      await updateUser({
        email: user.email,
        name: user.name,
        photo: base64Image,
      });

      const updatedUser = {
        ...user,
        photoURL: base64Image,
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Profile updated!');
      if (onClose) onClose(); // close dialog
    }
  };

  if (!user) {
    return <div className="text-red-500 text-center">User not loaded</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input type="text" value={user.name} disabled readOnly className="cursor-not-allowed" />
      </div>

      <div>
        <Label>Email</Label>
        <Input type="email" value={user.email} disabled readOnly className="cursor-not-allowed" />
      </div>

      <div>
        <Label>Upload Photo</Label>
        <Input type="file" accept="image/*" onChange={handlePhotoChange} />
        {previewURL && (
          <Image
            src={previewURL}
            alt="Profile Preview"
            width={80}
            height={80}
            className="rounded-full mt-2"
          />
        )}
      </div>

      <Button onClick={handleSave} className="w-full bg-purple-600 text-white mt-4">
        Save Changes
      </Button>
    </div>
  );
}

export default ProfileDialog;
