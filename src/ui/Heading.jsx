/* eslint-disable react/prop-types */

function Heading({ as, children }) {
  if (as === "h1")
    return <h1 className="text-2xl font-semibold">{children}</h1>;
  if (as === "h2") return <h1 className="text-xl">{children}</h1>;
  if (as === "h2")
    return <h1 className="text-center text-2xl font-semibold">{children}</h1>;
}

export default Heading;
