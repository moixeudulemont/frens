'use client';

export default function Toast({ msg }) {

  return (
    <div style={{left: '50%' ,transform: 'translateX(-50%)', zIndex: 1000}} className="w-9/12 fixed mx-auto top-[40%] p-4 rounded-lg shadow-md bg-lime-200">
          <p className="text-black font-bold text-center break-words">{msg}</p>
    </div>
  );
}
