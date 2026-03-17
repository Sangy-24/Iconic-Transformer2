import React, { useState } from 'react';
import { Upload, Activity, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const AITools = () => {
  const [maintenanceResult, setMaintenanceResult] = useState(null);
  const [forecastResult, setForecastResult] = useState(false);

  const handleMaintenanceUpload = (e) => {
    e.preventDefault();
    // Simulate AI prediction
    setTimeout(() => {
      setMaintenanceResult({
        status: 'Maintenance Required',
        risk: 'High',
        timeline: 'Within 15 days'
      });
    }, 1500);
  };

  const handleForecastUpload = (e) => {
    e.preventDefault();
    // Simulate forecasting
    setTimeout(() => {
      setForecastResult(true);
    }, 1500);
  };

  return (
    <div className="bg-brand-light min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-5xl font-bold mb-12 text-brand-dark text-center">AI Intelligence Suite</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Predictive Maintenance Model */}
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 flex flex-col">
            <div className="flex items-center mb-8">
              <div className="p-4 bg-blue-50 text-brand-accent rounded-2xl mr-4">
                <Activity className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-brand-dark">Predictive Maintenance</h2>
            </div>
            <p className="text-brand-grey mb-8">
              Upload transformer telemetry data (vibration, temperature, load levels, etc.) to get an AI-powered health prediction for the next 30 days. Uses a Random Forest Classifier trained on years of operational history.
            </p>
            
            <form onSubmit={handleMaintenanceUpload} className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 flex flex-col items-center justify-center text-center">
              <Upload className="w-10 h-10 text-brand-grey mb-4" />
              <p className="font-bold text-brand-dark mb-2">Upload Telemetry CSV File</p>
              <p className="text-sm text-brand-grey mb-6">Max file size 10MB</p>
              <button type="button" className="bg-white border border-gray-300 text-brand-dark px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                Select File
              </button>
              <button type="submit" className="mt-6 w-full bg-brand-accent text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">
                Run AI Analysis
              </button>
            </form>

            {maintenanceResult && (
              <div className="mt-auto bg-red-50 border border-red-200 p-6 rounded-2xl">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-red-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-red-700 text-lg mb-2">Prediction: {maintenanceResult.status}</h3>
                    <p className="text-red-600 text-sm mb-1">Risk Level: <span className="font-bold">{maintenanceResult.risk}</span></p>
                    <p className="text-red-600 text-sm">Estimated Timeline: <span className="font-bold">{maintenanceResult.timeline}</span></p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Demand Forecasting */}
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 flex flex-col">
            <div className="flex items-center mb-8">
              <div className="p-4 bg-green-50 text-green-600 rounded-2xl mr-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-brand-dark">Demand Forecasting</h2>
            </div>
            <p className="text-brand-grey mb-8">
              Utilize our Prophet Time Series model to predict transformer and service demand over the next 12 weeks. Better inventory planning, optimized production, based on historical and seasonal trends.
            </p>
            
            <form onSubmit={handleForecastUpload} className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 flex flex-col items-center justify-center text-center">
              <Upload className="w-10 h-10 text-brand-grey mb-4" />
              <p className="font-bold text-brand-dark mb-2">Upload Historical Demand Data</p>
              <p className="text-sm text-brand-grey mb-6">Requires CSV with Date & Units format</p>
              <button type="button" className="bg-white border border-gray-300 text-brand-dark px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                Select File
              </button>
              <button type="submit" className="mt-6 w-full bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                Generate 12-Week Forecast
              </button>
            </form>

            {forecastResult && (
              <div className="mt-auto bg-green-50 border border-green-200 p-6 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
                  <p className="font-bold text-green-700 text-lg">Forecast Generated Successfully</p>
                  <p className="text-sm text-green-600 mt-2 hover:underline cursor-pointer">View Details in Dashboard</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITools;
