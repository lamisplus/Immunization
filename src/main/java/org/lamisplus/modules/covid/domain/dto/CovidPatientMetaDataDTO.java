package org.lamisplus.modules.covid.domain.dto;

import lombok.Data;

import java.util.List;

@Data
public class CovidPatientMetaDataDTO {
    private  long totalRecords;
    private Integer totalPages;
    private Integer pageSize;
    private Integer currentPage;
    private List<CovidPatientDTO> records;
}
