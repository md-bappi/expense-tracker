const Card = ({ card }) => {
  return (
    <div className="bg-[var(--bg-primary-color)] p-4 rounded-lg shadow-sm hover:shadow-md duration-200 cursor-pointer">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">{card.title}</h2>
        <span className="text-lg">{card.icon}</span>
      </div>

      <div className="flex flex-col mt-4">
        {card.amount && (
          <h2 className="text-xl font-medium text-[var(--text-primary-color)]">
            {card.amount}
          </h2>
        )}
        {card.des && (
          <p className="text-xs text-[var(--text-muted-color)] tracking-tight">
            {card.des}
          </p>
        )}
      </div>

      {card.status && (
        <div className="flex flex-col gap-1 mt-2">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full w-max ${
              card.status === "Completed"
                ? "bg-[var(--bg-accent-color)] text-[var(--text-accent-color)]"
                : card.status === "In Progress"
                ? "bg-yellow-100 text-yellow-800"
                : card.status === "Overdue"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {card.status}
          </span>
          {card.Due && (
            <span className="text-xs text-gray-500">Due: {card.Due}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
