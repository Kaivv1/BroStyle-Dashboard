/*eslint-disable react/prop-types */

function Logo({ login }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <img src="../../fist.png" alt="logo" className="h-20 xl:h-24" />
      <p className="text-2xl tracking-widest">
        <span className="font-bold text-color-brand-600">Bro</span>
        <span className="font-semibold">Style</span>
        {login && <span className="ml-2 font-semibold">Dashboard</span>}
      </p>
    </div>
  );
}

export default Logo;
