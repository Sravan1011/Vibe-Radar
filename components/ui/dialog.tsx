import React, { Fragment } from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";

export function Dialog({ open, onOpenChange, children }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={onOpenChange}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
          >
            <HeadlessDialog.Panel className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-2xl p-6">
              {children}
            </HeadlessDialog.Panel>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  );
}

export function DialogContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-h-[60vh] overflow-y-auto ${className}`}>{children}</div>;
}

export function DialogHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-2 ${className}`}>{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold leading-tight">{children}</h2>;
}

export function DialogClose({ asChild = false, children }: { asChild?: boolean; children: React.ReactNode }) {
  // asChild allows passing a custom button
  return asChild ? children : <button>{children}</button>;
} 