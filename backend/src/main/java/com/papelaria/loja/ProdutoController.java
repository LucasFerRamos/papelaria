package com.papelaria.loja;

import java.util.List;

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
public class ProdutoController {
    @Autowired
    ProdutoRepository bd;
    
    @PostMapping("produto")
    public void gravar(@RequestBody Produto obj){
        bd.save(obj);
    }
    @PutMapping("produto")
    public void alterar(@RequestBody Produto obj){
        bd.save(obj);
    }
    @GetMapping("produto/{id}")
    public Produto carregar(@PathVariable("id") Integer codigo){
        if(bd.existsById(codigo)){
            return bd.findById(codigo).get();
        } else {
            return new Produto();
        }
    }
    @DeleteMapping("produto/{id}")
    public void apagar(@PathVariable("id") Integer codigo){
        bd.deleteById(codigo);
    }
    @GetMapping("produtos")
    public List<Produto> listar(){
        return bd.findAll();
    }
    
    @GetMapping("produtos/vitrine")
    public List<Produto> listarVitrine(){
        return bd.listarVitrine();
    }

    @GetMapping("produtos/busca/{termo}")
    public List<Produto> fazerBusca(@PathVariable("termo") String termo){
        return bd.fazerBusca("%"+ termo + "%");
    }

}
