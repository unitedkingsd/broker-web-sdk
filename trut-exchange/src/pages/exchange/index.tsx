'use client';

import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import TradingInterface from '../../components/TradingInterface';
import Footer from '../../components/Footer';

const ExchangePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Exchange - Trut Crypto Exchange</title>
        <meta name="description" content="Professional perpetual futures trading on BNB Smart Chain" />
        <meta name="keywords" content="crypto, futures, trading, BNB, Smart Chain, perpetual, derivatives" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
        <Header />
        <main className="flex-1">
          <TradingInterface />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ExchangePage;