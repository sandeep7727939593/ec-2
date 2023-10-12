

export default function TileComponent ({data, selected = [], onClick}) {
    return <div className="mt-3 flex flex-wrap items-center gap-1">
        {
            data.map((dataItem) => (
                <label
                    key = {dataItem.id}
                    className={`cursor-pointer ${
                        selected.length &&
                        selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                          ? "bg-black"
                          : ""
                      }`}
                      onClick={() => onClick(dataItem)}
                    >
                    <span
                     className={`rounded-lg border border-black px-6 py-2 font-bold ${
                        selected.length &&
                        selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                          ? "text-white"
                          : ""
                      }`}
                    >
                        {dataItem.label}
                    </span>
                </label>
            ))
        }
    </div>
} 