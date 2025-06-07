package com.Meditrack.Service.Dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import java.util.List;

public interface Idao<T, ID>{
    // Método para obtener o retornar una lista de todas las instancias de una entidad en la base de datos.
    Page<T> findAll(PageRequest pageable);

    // Método para obtener una lista completa de todas las instancias sin paginación
    List<T> getAll();

    // Método para obtener una instancia específica de la entidad basada en un identificador único.
    T getById(ID id);

    // Método para crear una nueva instancia de la entidad en la base de datos.
    T create(T entity);

    // Método para actualizar una instancia existente de la entidad en la base de datos.
    T update(T entity);;

    // Método para eliminar una instancia por id existente de la entidad de la base de datos.
    void delete(ID id);
}