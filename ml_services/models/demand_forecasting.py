from prophet import Prophet
import pandas as pd
import joblib

def generate_historical_demand():
    """Generates mock historical demand data."""
    dates = pd.date_range(start='2020-01-01', periods=104, freq='W') # 2 years weekly
    data = pd.DataFrame({
        'ds': dates,
        'y': [100 + (x % 50) + (x * 0.5) for x in range(104)] # Trend + seasonal pattern
    })
    return data

def train_prophet_model():
    """Trains a Prophet time series model for demand forecasting."""
    df = generate_historical_demand()
    
    # 12-week prediction model architecture
    model = Prophet(yearly_seasonality=True, weekly_seasonality=False, daily_seasonality=False)
    model.fit(df)
    
    # Save the model
    with open('models/demand_forecasting_prophet.pkl', 'wb') as f:
        joblib.dump(model, f)
    print("Forecasting model trained and saved.")

def generate_forecast(periods=12):
    """Generates a forecast for the given number of periods (weeks)."""
    try:
        with open('models/demand_forecasting_prophet.pkl', 'rb') as f:
            model = joblib.load(f)
    except Exception:
        train_prophet_model()
        with open('models/demand_forecasting_prophet.pkl', 'rb') as f:
            model = joblib.load(f)
            
    future = model.make_future_dataframe(periods=periods, freq='W')
    forecast = model.predict(future)
    
    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods)

if __name__ == "__main__":
    train_prophet_model()
