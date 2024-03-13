function Logo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <img src="../../public/fist.png" alt="logo" className="h-24" />
      <p className="text-2xl tracking-widest">
        <span className="text-color-brand-600 font-bold">Bro</span>
        <span className="font-semibold">Style</span>
      </p>
    </div>
  );
}

export default Logo;
