const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className=" bg-[var(--bg-primary-color)] p-4 rounded-lg  shadow-sm hover:shadow-md duration-200 cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-sm">{card.title}</h2>
        <span
          className={` text-sm ${
            card.title === "Overdue Projects" ? "text-red-600" : ""
          }`}
        >
          {card.icon}
        </span>
      </div>
      <div className="flex flex-col mt-8">
        <h2
          className={`text-xl font-medium text-[var(--text-primary-color)] ${
            card.title === "Overdue Projects" ? "text-red-600" : ""
          }`}
        >
          {card.amount}
        </h2>
        <p className=" text-xs text-[var(--text-muted-color)] tracking-tight">
          {card.des}
        </p>
      </div>
    </div>
  );
};

export default Card;
