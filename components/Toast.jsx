'use client';

export default function Toast({ msg }) {

  return (
    <div className="w-6/12 absolute mx-auto top-[10%] right-[10%] p-4 rounded-lg shadow-md bg-orange-200">
          <p className="text-black font-bold text-center break-words">{msg}</p>
    </div>
  );
}
