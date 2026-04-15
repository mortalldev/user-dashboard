import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/index.css';
import { Provider } from 'react-redux';
import { store } from './app/store/index.ts';
import { Toaster } from './components/ui/sonner.tsx';
import { ThemeProvider } from './app/providers/ThemeProvider.tsx';
import App from './app/App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider defaultTheme="dark" storageKey="theme">
                <Toaster position="top-right" theme="dark" />
                <App />
            </ThemeProvider>
        </Provider>
    </StrictMode>
);
