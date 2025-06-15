export default function CardWelcome() {
       const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric',day: 'numeric',  month: 'long', });
       const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="h-full w-full">
      <div className="inline-flex justify-between h-full w-full rounded-2xl border border-gray-200 bg-white p-5">

        <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-bold">Welcome Back, <span className="text-cyan-600">Angela</span>  !</h1>
              <p className="text-gray-600">Blablaba blibli blu blu 👾</p>
        </div>

       <div className="flex flex-col space-y-2">
              <h1 className="text-xl font-bold">{currentDate}</h1>
              <p className="text-xl font-bold justify-end">{currentTime}</p>

       </div>

      </div>
    </div>
  );
}