package com.recipehub.profile_service.mapper;

import com.recipehub.profile_service.dto.request.ProfileCreationRequest;
import com.recipehub.profile_service.dto.response.UserProfileResponse;
import com.recipehub.profile_service.model.UserProfile;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-17T23:06:17+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.z20241112-1021, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class UserProfileMapperImpl implements UserProfileMapper {

    @Override
    public UserProfile toUserProfile(ProfileCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        UserProfile.UserProfileBuilder userProfile = UserProfile.builder();

        userProfile.city( request.getCity() );
        userProfile.dob( request.getDob() );
        userProfile.fullName( request.getFullName() );
        userProfile.userId( request.getUserId() );

        return userProfile.build();
    }

    @Override
    public UserProfileResponse toUserProfileReponse(UserProfile entity) {
        if ( entity == null ) {
            return null;
        }

        UserProfileResponse.UserProfileResponseBuilder userProfileResponse = UserProfileResponse.builder();

        userProfileResponse.city( entity.getCity() );
        userProfileResponse.dob( entity.getDob() );
        userProfileResponse.fullName( entity.getFullName() );
        userProfileResponse.id( entity.getId() );
        userProfileResponse.userId( entity.getUserId() );

        return userProfileResponse.build();
    }
}
