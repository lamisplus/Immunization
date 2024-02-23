package org.lamisplus.modules.covid.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Map;
import javax.persistence.AttributeConverter;
import javax.validation.constraints.NotNull;

public class ExtraDataConverter implements AttributeConverter<Map<String, String>, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    @NotNull
    public String convertToDatabaseColumn(Map<String, String> extraData) {
        try {
            return objectMapper.writeValueAsString(extraData);
        } catch (JsonProcessingException ex) {
            throw new IllegalStateException(ex);
        }
    }

    @Override
    public Map<String, String> convertToEntityAttribute(String databaseDataAsJsonString) {
        try {
            if (null == databaseDataAsJsonString || "null".equalsIgnoreCase(databaseDataAsJsonString)) {
                return null;
            } else {
                TypeReference<Map<String, String>> typeRef = new TypeReference<Map<String, String>>() {
                };
                return objectMapper.readValue(databaseDataAsJsonString, typeRef);
            }
        } catch (IOException ex) {
            throw new IllegalStateException(ex);
        }
    }
}
