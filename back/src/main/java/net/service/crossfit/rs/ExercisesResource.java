/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.service.crossfit.rs;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import net.service.crossfit.session.ExercisesFacade;

@Stateless
@Path("/exercises")
public class ExercisesResource {
    
    @EJB
    ExercisesFacade exercisesFacade;
    
    @Produces({MediaType.APPLICATION_JSON})
    @GET
    public Response getAll() {
        return Response.ok(exercisesFacade.findAll()).build();
    }
}
