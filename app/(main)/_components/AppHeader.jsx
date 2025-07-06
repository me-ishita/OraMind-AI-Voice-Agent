'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import ProfileDialog from './ProfileDialog';

function AppHeader() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-1 bg-white shadow-md z-10">
      <Image
        src="/logo.jpg"
        alt="Oramind Logo"
        width={180}
        height={50}
        className="object-contain mt-1"
        priority
      />

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
          {user?.photoURL ? (
            <Image
              src={user.photoURL}
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full border shadow"
            />
          ) : (
            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold">
              {user?.name?.[0] || 'G'}
            </div>
          )}
          <span className="font-medium">{user?.name || 'Guest'}</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="p-2 space-y-1">
          <DropdownMenuItem onClick={() => router.push('/main-dashboard')}>
            🧭 Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            👤 Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              localStorage.clear();
              router.push('/');
            }}
          >
            ⛔ Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ✅ This renders the Profile Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle>Profile Settings</DialogTitle>
          <ProfileDialog onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

    </header>
  );
}

export default AppHeader;
