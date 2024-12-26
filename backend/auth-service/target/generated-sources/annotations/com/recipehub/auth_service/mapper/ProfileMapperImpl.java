package com.recipehub.auth_service.mapper;

import com.recipehub.auth_service.dto.request.ProfileCreationRequest;
import com.recipehub.auth_service.dto.request.UserCreationRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-26T16:59:07+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class ProfileMapperImpl implements ProfileMapper {

    @Override
    public ProfileCreationRequest toProfileCreationRequest(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        ProfileCreationRequest.ProfileCreationRequestBuilder profileCreationRequest = ProfileCreationRequest.builder();

        profileCreationRequest.fullName( request.getFullName() );
        profileCreationRequest.dob( request.getDob() );
        profileCreationRequest.city( request.getCity() );

        return profileCreationRequest.build();
    }
}
