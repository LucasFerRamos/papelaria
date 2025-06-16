package com.papelaria.loja;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemCestaRepository extends JpaRepository<ItemCesta, Integer> {
        @Query(value = "select * from itemCesta where codigoCesta=?1", nativeQuery = true)
        List<ItemCesta> carregarItens(Integer codigoCesta);

}
