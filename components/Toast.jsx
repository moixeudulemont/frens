'use client';

export default function Toast({ msg }) {

  return (
    <div style={{left: '50%' ,transform: 'translateX(-50%)', zIndex: 100}} className="w-9/12 fixed mx-auto top-0 p-4 rounded-lg shadow-md bg-lime-200">
          <p className="text-black font-bold text-center break-words">{msg}</p>
    </div>
  );
}
