/* eslint-disable react/prop-types */
function ContentContainer({ children }) {
  return (
    <div className="mx-auto flex max-w-[80rem] flex-col gap-8 ">{children}</div>
  );
}

export default ContentContainer;
