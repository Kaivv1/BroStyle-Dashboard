/* eslint-disable react/prop-types */

function Heading({ as, children }) {
  if (as === "h1")
    return <h1 className="text-3xl font-semibold">{children}</h1>;
  if (as === "h2") return <h1 className="text-2xl">{children}</h1>;
  if (as === "h3")
    return <h1 className="text-center text-3xl font-semibold">{children}</h1>;
  if (as === "h4")
    return <h1 className="text-center text-2xl font-semibold">{children}</h1>;
  if (as === "h5") return <h1 className="text-xl font-semibold">{children}</h1>;
}

export default Heading;
