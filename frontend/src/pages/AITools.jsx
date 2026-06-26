import { useState, useRef } from "react";
import MaterialIcon from "../components/MaterialIcon";
import PredictiveMaintenanceHub from "../components/PredictiveMaintenanceHub";
import { ML_API_BASE } from "../api/mlService";

const AITools = () => {
  const [activeTab, setActiveTab] = useState("maintenance");
  const [forecastResult, setForecastResult] = useState(null);
  const [forecastMeta, setForecastMeta] = useState(null);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [forecastFileName, setForecastFileName] = useState("");

  const forecastFileInputRef = useRef(null);

  const handleForecastUpload = async (e) => {
    e.preventDefault();
    const file = forecastFileInputRef.current?.files[0];
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    if (availableProducts.length > 1 && !selectedProductId) {
      alert("Please select a product from the dropdown before running analysis.");
      return;
    }

    setForecastFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);
    if (selectedProductId) formData.append("product_id", selectedProductId);

    try {
      const response = await fetch(`${ML_API_BASE}/forecast-demand`, { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail || data));
      }
      if (data.status === "success") {
        setForecastResult(data.forecast || []);
        setForecastMeta({ trend: data.trend, selectedProduct: data.selected_product });
      } else {
        alert("Error from server: " + (data.detail || JSON.stringify(data)));
      }
    } catch (err) {
      alert("Failed to connect to ML service: " + err);
    }
  };

  const handleDemandFileSelected = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setForecastFileName(file.name);
    setForecastResult(null);
    setForecastMeta(null);
    setAvailableProducts([]);
    setSelectedProductId("");
    setLoadingProducts(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${ML_API_BASE}/forecast-demand/products`, { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail || data));
      }
      if (data.status === "success") {
        const products = data.products || [];
        setAvailableProducts(products);
        if (products.length === 1) setSelectedProductId(products[0].product_id);
      } else {
        alert("Error from server: " + (data.detail || JSON.stringify(data)));
      }
    } catch (err) {
      alert("Failed to analyze products from CSV: " + err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const downloadDemandTemplate = () => {
    const templateContent = ["ds,y", "2023-01-01,100", "2023-01-08,110", "2023-01-15,125"].join("\n");
    const blob = new Blob([templateContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "demand_forecast_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-surface pb-28 md:pb-12">
      <header className="glass-panel sticky top-0 z-30 flex h-20 items-center justify-between px-6 shadow-industrial md:px-8">
        <div className="flex items-center gap-6">
          <h1 className="font-headline text-xl font-bold tracking-tighter text-slate-900">Iconic Transformers</h1>
          <div className="hidden items-center gap-2 text-sm text-secondary lg:flex">
            <span>Industrial OS</span>
            <MaterialIcon name="chevron_right" className="text-xs" />
            <span className="font-semibold text-primary">AI Tools</span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-surface-container-low px-4 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Neural Engine Active</span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-10 px-6 py-10 md:px-8">
        <section className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface md:text-4xl">
              {activeTab === "maintenance" ? "Predictive Maintenance Hub" : "Intelligence Hub"}
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-secondary">
              {activeTab === "maintenance"
                ? "Harnessing neural networks to forecast anomalies before they manifest. AI-driven insights for transformer lifecycle management."
                : "Predictive modeling for global supply chain optimization and 12-week demand forecasting."}
            </p>
          </div>
          <div className="flex rounded-full bg-surface-container-low p-1">
            <button
              type="button"
              onClick={() => setActiveTab("maintenance")}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                activeTab === "maintenance" ? "bg-white text-primary shadow-sm" : "text-secondary"
              }`}
            >
              Maintenance
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("forecast")}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                activeTab === "forecast" ? "bg-white text-primary shadow-sm" : "text-secondary"
              }`}
            >
              Forecasting
            </button>
          </div>
        </section>

        {activeTab === "maintenance" && <PredictiveMaintenanceHub />}

        {activeTab === "forecast" && (
          <div className="grid grid-cols-12 gap-8">
            <section className="industrial-card col-span-12 rounded-lg p-8 text-white lg:col-span-8">
              <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <MaterialIcon name="trending_up" className="text-primary-container" />
                    <h3 className="font-headline text-xl font-bold">Demand Forecasting AI</h3>
                  </div>
                  <p className="max-w-md text-sm text-slate-400">
                    Upload historical demand data to generate a 12-week forecast using Prophet time series modeling.
                  </p>
                </div>
                <button type="button" onClick={downloadDemandTemplate} className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold hover:bg-slate-700">
                  DOWNLOAD TEMPLATE
                </button>
              </div>

              <form onSubmit={handleForecastUpload}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => forecastFileInputRef.current?.click()}
                  onKeyDown={(e) => e.key === "Enter" && forecastFileInputRef.current?.click()}
                  className="group mb-8 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/30 p-10 transition-all hover:bg-slate-800/50"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container/10 transition-transform group-hover:scale-110">
                    <MaterialIcon name="cloud_upload" className="text-3xl text-primary-container" />
                  </div>
                  <p className="font-semibold text-white">Drop dataset here to generate forecast</p>
                  <p className="mt-2 text-xs text-slate-500">Supports CSV with ds,y columns</p>
                  {forecastFileName && <p className="mt-4 text-xs text-primary-container">Selected: {forecastFileName}</p>}
                  <input ref={forecastFileInputRef} type="file" accept=".csv" className="hidden" onChange={handleDemandFileSelected} />
                </div>

                {loadingProducts && <p className="mb-4 text-xs text-slate-400">Analyzing products from CSV...</p>}
                {!loadingProducts && availableProducts.length > 0 && (
                  <div className="mb-6">
                    <label htmlFor="productSelect" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">
                      Select Product
                    </label>
                    <select
                      id="productSelect"
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white"
                    >
                      <option value="">Choose a product</option>
                      {availableProducts.map((product) => (
                        <option key={product.product_id} value={product.product_id}>
                          {product.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button type="submit" className="w-full rounded-lg bg-primary-container py-4 font-headline font-bold text-on-primary-container transition-all hover:brightness-110">
                  Generate 12-Week Forecast
                </button>
              </form>

              {forecastResult?.length > 0 && (
                <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                  {forecastMeta?.selectedProduct && (
                    <p className="mb-2 text-sm text-primary-container">
                      Product: {forecastMeta.selectedProduct.product_name || forecastMeta.selectedProduct.product_id}
                    </p>
                  )}
                  {forecastMeta?.trend && (
                    <p className="mb-4 text-sm text-slate-300">
                      Demand expected to {forecastMeta.trend.direction} by {forecastMeta.trend.change} units ({forecastMeta.trend.change_percent}%)
                    </p>
                  )}
                  <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-700 text-slate-400">
                          <th className="py-2">Week</th>
                          <th className="py-2 text-right">Forecast</th>
                          <th className="py-2 text-right">Low</th>
                          <th className="py-2 text-right">High</th>
                        </tr>
                      </thead>
                      <tbody>
                        {forecastResult.map((row, index) => (
                          <tr key={index} className="border-b border-slate-800">
                            <td className="py-2 text-slate-300">{row.ds}</td>
                            <td className="py-2 text-right text-primary-container">{row.yhat?.toFixed?.(2) ?? row.yhat}</td>
                            <td className="py-2 text-right text-slate-400">{row.yhat_lower?.toFixed?.(2) ?? row.yhat_lower}</td>
                            <td className="py-2 text-right text-slate-400">{row.yhat_upper?.toFixed?.(2) ?? row.yhat_upper}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            <aside className="col-span-12 space-y-8 lg:col-span-4">
              <div className="rounded-lg bg-surface-container-lowest p-8 shadow-industrial">
                <h3 className="mb-6 font-headline font-bold text-inverse-surface">Health Score</h3>
                <div className="flex flex-col items-center">
                  <div className="relative h-24 w-48 overflow-hidden">
                    <div className="absolute left-0 top-0 h-48 w-48 rounded-full border-[16px] border-surface-container-high" />
                    <div className="absolute left-0 top-0 h-48 w-48 -rotate-45 rounded-full border-[16px] border-primary border-b-transparent border-r-transparent" />
                    <div className="absolute bottom-0 left-0 w-full text-center">
                      <span className="font-headline text-4xl font-black text-inverse-surface">94.2%</span>
                    </div>
                  </div>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-secondary">System Integrity Optimal</p>
                </div>
              </div>

              <div className="industrial-card rounded-lg p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/20 p-3">
                    <MaterialIcon name="auto_awesome" className="text-primary-container" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Forecast Insights</h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      Upload your historical CSV to unlock AI-powered demand predictions and seasonal trend analysis.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITools;
