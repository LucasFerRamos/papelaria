package com.papelaria.loja;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class ClienteController {
     @Autowired
    ClienteRepository bd;
    // @Autowired
    // LojaService service;

    @PostMapping("cliente")
    public void gravar(@RequestBody Cliente obj){
        bd.save(obj);
    }

    @GetMapping("clientes")
    public List<Cliente> listar(){
        return bd.findAll();
    }

    @PutMapping("cliente")
    public void alterar(@RequestBody Cliente obj){
            bd.save(obj);
            // service.enviarEmail(obj.getEmail(),"Atualização de cadastro",
            //  "ocorreu uma atualizaçao no seu cadastro");
    }

    @DeleteMapping("cliente/{codigo}")
    public void apagar(@PathVariable("codigo") Integer codigo){
       
            bd.deleteById(codigo);
            
    }

    @GetMapping("cliente/{codigo}")
    public Cliente carregar(@PathVariable("codigo") Integer codigo){
        if(bd.existsById(codigo)){
            return bd.findById(codigo).get();
        } else {
            return new Cliente();
        }
    }

    @PostMapping("cliente/login")
    public Cliente fazerLogin(@RequestBody Cliente obj){
        Optional<Cliente> retorno = bd.fazerLogin(obj.getEmail(), obj.getSenha());
        if(retorno.isPresent()){
            return retorno.get();
        } else {
            return new Cliente();
        }
    }

}
