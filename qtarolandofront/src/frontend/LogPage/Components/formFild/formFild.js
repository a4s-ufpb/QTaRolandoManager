import './index.css';
import React from 'react';



function formFild() {
    return (

        <div class='form'>
            <div class='fill'>
                email:
                <div class='inputs'>
                    <input type='text' placeholder='Digite o nome do Usuário' />
                </div>
                senha:
                <div class='inputs'>
                    <input type='text' placeholder='Digite sua senha' />
                </div>
                <div class='a'>
                <button type='butoon' id='bt1'>Cadastrar-se</button>
                
                <button type='butoon' id='bt2'>Entrar</button>
                </div>
                
            </div>
        </div>
    );
}
export default formFild;