'use client'; 

import StockCard from "./components/StockCard";
import TopBar from "./components/TopBar";
import FormAlert from "./components/FormAlert";
import PlottingGraph from "./components/PlottingGraph";

export default function Home() {
  const stockData = [
    {
      name: 'Apple (AAPL)',
      price: 178.56,
    },
    {
      name: 'Google (GOOG)',
      price: 123.45,
    },
    {
      name: 'Microsoft (MSFT)',
      price: 278.12,
    },
  ];
  return (
    <main className="flex flex-col min-h-screen items-center justify-start">
      <TopBar>
        <StockCard changePercent={2} value={23.2} stockName="BTC/USD" />
        <StockCard changePercent={2} value={23.2} stockName="BTC/USD" />
        <StockCard changePercent={2} value={23.2} stockName="ETH/USD" />
        <StockCard changePercent={2} value={23.2} stockName="EUR/USD" />
        <StockCard changePercent={2} value={23.2} stockName="ETH/USD" />
        <StockCard changePercent={2} value={23.2} stockName="BTC/USD" />
        <StockCard changePercent={2} value={23.2} stockName="ETH/USD" />
        <StockCard changePercent={2} value={23.2} stockName="EUR/USD" />
        <StockCard changePercent={2} value={23.2} stockName="EUR/USD" />
      </TopBar>

      {/* Sección principal dividida en dos columnas */}
      <div className="flex justify-center w-full">
        {/* Columna izquierda para FormAlert */}
        <div className="w-full lg:w-1/5 p-4">
          <FormAlert
            onSubmit={(value1: any) => {
              console.log("click here, value 1:", value1);
            }}
            stockNames={["USD", "EUR/USD"]}
          />
        </div>

        {/* Columna derecha para la gráfica (mostrar o esconder según el tamaño de la pantalla) */}
        <div className="hidden lg:block w-full lg:w-4/5 p-4">
        <PlottingGraph stocks={stockData} />
        </div>
      </div>
    </main>
  );
}