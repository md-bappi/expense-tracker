const Title = ({ text, des }) => {
  return (
    <div>
      <h2 className=" text-xl font-medium text-[var(--text-primary-color)] capitalize">
        {text}
      </h2>
      <p className="text-sm text-[var(--text-muted-color)]">{des}</p>
    </div>
  );
};

export default Title;
