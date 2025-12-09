export default function PageHeader({ title, subtitle, right }) {
    return (
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {right && <div>{right}</div>}
      </div>
    );
  }
  