RESULT = {
    'WW91IHVzdWFsbHkgd2FpdCBmb3Igb3RoZXJzIHRvIGludHJvZHVjZSB0aGVtc2VsdmVzIGZpcnN0IGF0IHNvY2lhbCBnYXRoZXJpbmdzLg==': ['-', 'e'],
    'WW91IHVzdWFsbHkgcHJlZmVyIHRvIGJlIGFyb3VuZCBvdGhlcnMgcmF0aGVyIHRoYW4gb24geW91ciBvd24u': ['+', 'e'],
    'WW91ciBmcmllbmRzIHdvdWxkIGRlc2NyaWJlIHlvdSBhcyBsaXZlbHkgYW5kIG91dGdvaW5nLg==': ['+', 'e'],

    'WW91IGJlY29tZSBib3JlZCBvciBsb3NlIGludGVyZXN0IHdoZW4gdGhlIGRpc2N1c3Npb24gZ2V0cyBoaWdobHkgdGhlb3JldGljYWwu': ['+', 's'],
    'WW91IGFyZSBkcmF3biB0byB2YXJpb3VzIGZvcm1zIG9mIGNyZWF0aXZlIGV4cHJlc3Npb24sIHN1Y2ggYXMgd3JpdGluZy4==': ['+', 's'],

    'SW4gZGlzYWdyZWVtZW50cywgeW91IHByaW9yaXRpemUgcHJvdmluZyB5b3VyIHBvaW50IG92ZXIgcHJlc2VydmluZyB0aGUgZmVlbGluZ3Mgb2Ygb3RoZXJzLg==': ['+', 't'],
    'WW91IGFyZSBub3QgZWFzaWx5IHN3YXllZCBieSBlbW90aW9uYWwgYXJndW1lbnRzLg==': ['+', 't'],
    'V2hlbiBmYWN0cyBhbmQgZmVlbGluZ3MgY29uZmxpY3QsIHlvdSB1c3VhbGx5IGZpbmQgeW91cnNlbGYgZm9sbG93aW5nIHlvdXIgaGVhcnQu': ['-', 't'],
    'WW91IHVzdWFsbHkgYmFzZSB5b3VyIGNob2ljZXMgb24gb2JqZWN0aXZlIGZhY3RzIHJhdGhlciB0aGFuIGVtb3Rpb25hbCBpbXByZXNzaW9ucy4=': ['+', 't'],
    'WW91IGVuam95IGRlYmF0aW5nIGV0aGljYWwgZGlsZW1tYXMu': ['-', 't'],
    
    'WW91IHByZWZlciB0byBkbyB5b3VyIGNob3JlcyBiZWZvcmUgYWxsb3dpbmcgeW91cnNlbGYgdG8gcmVsYXgu': ['+', 'j'],
    'WW91IG9mdGVuIGVuZCB1cCBkb2luZyB0aGluZ3MgYXQgdGhlIGxhc3QgcG9zc2libGUgbW9tZW50Lg==': ['-', 'j'],
    'WW91IGZpbmQgaXQgY2hhbGxlbmdlcyB0byBtYWludGFpbiBhIGNvbnNpc3RlbnQgd29yayBvciBzdHVkeSBzY2hlZHVsZS4=': ['+', 'j'],
}

INVESTMENT_PROFILES = {
    (5, 1, 3, 4): {
        "Explanation": "High extroversion (5) leads to a preference for growth and risky assets such as stocks and crypto. Low sensing (1) suggests a focus on innovation and future potential over current stability. Moderate thinking (3) balances logic with some emotional factors. Judging (4) indicates a preference for structured, long-term planning.",
        "Risk Profile": "Moderate-High Risk | Opportunistic & Growth-Oriented",
        "Allocation": {
            "Growth Stocks": (35, ["NVIDIA (NVDA)", "Tesla (TSLA)", "Shopify (SHOP)", "Palantir (PLTR)"]),
            "Cryptocurrency": (25, ["Ethereum (ETH)", "Solana (SOL)", "Chainlink (LINK)", "Avalanche (AVAX)"]),
            "Real Estate": (15, ["Fundrise (fractional real estate)", "Realty Income (O)"]),
            "Bonds": (10, ["U.S. Treasury Bonds", "Apple Corporate Bonds (AAPL)"]),
            "Small Businesses": (10, ["Startups via crowdfunding (AngelList, Kickstarter)"]),
            "Cash": (5, ["High-yield savings (Ally, Marcus by Goldman Sachs)"])
        }
    },
    (1, 5, 2, 6): {
        "Explanation": "Low extroversion (1) favors conservative and stable investments. High sensing (5) values tangible and proven methods over speculative investments. Moderate thinking (2) leans towards a cautious, risk-averse approach. Strong judging (6) prefers structure and long-term commitments.",
        "Risk Profile": "Low Risk | Conservative & Stability-Focused",
        "Allocation": {
            "Bonds": (40, ["U.S. Treasury Bonds", "Vanguard Total Bond Market ETF (BND)", "Microsoft Corporate Bonds"]),
            "Dividend Stocks": (25, ["Johnson & Johnson (JNJ)", "Procter & Gamble (PG)", "Coca-Cola (KO)", "Microsoft (MSFT)"]),
            "Real Estate": (20, ["Vanguard Real Estate ETF (VNQ)", "Direct property rental income"]),
            "Cash": (10, ["Money market accounts", "Certificates of Deposit (CDs)"]),
            "Gold/Precious Metals": (5, ["SPDR Gold Trust (GLD)", "Physical gold/silver holdings"])
        }
    },
    (3, 5, 2, 6): {
        "Explanation": "Moderate extroversion (3) supports balanced risk-taking. High sensing (5) values practical investments. Moderate thinking (2) suggests cautious decision-making. Strong judging (6) indicates structured financial planning.",
        "Risk Profile": "Low-Moderate Risk | Practical & Structured Approach",
        "Allocation": {
            "Bonds": (35, ["U.S. Treasury Bonds", "Vanguard Total Bond Market ETF (BND)", "Municipal bonds"]),
            "Dividend Stocks": (25, ["Johnson & Johnson (JNJ)", "Procter & Gamble (PG)", "PepsiCo (PEP)", "3M (MMM)"]),
            "Real Estate": (20, ["Rental properties", "Realty Income (O)", "Vanguard REIT ETF (VNQ)"]),
            "Cash": (10, ["High-yield savings", "CDs", "Emergency funds"]),
            "Crypto": (5, ["Bitcoin (BTC)", "Ethereum (ETH)"]),
            "Gold/Precious Metals": (5, ["SPDR Gold Trust (GLD)", "iShares Silver Trust (SLV)"])
        }
    },
    (1, 1, 0, 3): {
        "Explanation": "Low extroversion (1) indicates a preference for minimal risk. Low sensing (1) suggests a focus on abstract concepts rather than tangible assets. Extreme introversion (0) signals a strong risk-averse nature. Moderate judging (3) suggests some preference for planning.",
        "Risk Profile": "Very Low Risk | Stability-Focused & Conservative",
        "Allocation": {
            "Bonds": (50, ["U.S. Treasury Bonds", "Municipal bonds"]),
            "Dividend Stocks": (20, ["Coca-Cola (KO)", "Johnson & Johnson (JNJ)"]),
            "Cash": (20, ["Money market funds", "Emergency savings"]),
            "Gold/Precious Metals": (10, ["Physical gold holdings"])
        }
    }
}