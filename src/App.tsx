import React, {lazy, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import './App.css'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import("./pages/About"))
const History = lazy(() => import("./pages/History"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import('./pages/Register'))

function App() {
    return (
        <>
            <Header/>
            <div className="mainWrapper">
                <main>
                    <Suspense fallback={Loading()}>

                        <Switch>
                            <Route path="/" exact>
                                <Home/>
                            </Route>
                            <Route path="/history">
                                <History/>
                            </Route>
                            <Route path="/about">
                                <About/>
                            </Route>
                            <Route path="/login">
                                <Login/>
                            </Route>
                            <Route path="/register">
                                <Register/>
                            </Route>
                        </Switch>

                    </Suspense>
                </main>
                <Footer/>
            </div>


        </>
    );
}

export default App;
