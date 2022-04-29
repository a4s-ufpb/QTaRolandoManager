import './index.css';
import Logo from './Components/logoIcon/logo';
import FormFild from './Components/formFild/formFild'
import React from 'react';

function LogPage() {
    return (
        <body>
            <div className='orange'>
                <h1>QTáRolando Manager</h1>
                <h2>Oferecendo de forma simples e fácil acesso às principais informações de eventos na Paraíba. </h2>
                <Logo />
            </div>
            <div className='white'>
                <FormFild/>
            </div>
            
        </body>
    );
}
export default LogPage;