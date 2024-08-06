package com.website.website;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class InfoBlockService {

    @Autowired
    private InfoBlockRepository infoBlockRepository;

    public List<InfoBlock> getAllInfoBlocks() {
        return infoBlockRepository.findAll();
    }

    public Optional<InfoBlock> getInfoBlockById(Long id) {
        return infoBlockRepository.findById(id);
    }

    public InfoBlock createInfoBlock(InfoBlock infoBlock) {
        return infoBlockRepository.save(infoBlock);
    }

    public InfoBlock createOrUpdateInfoBlock(InfoBlock infoBlock) {
        return infoBlockRepository.save(infoBlock);
    }

    public InfoBlock updateInfoBlock(Long id, InfoBlock infoBlockDetails) {
        Optional<InfoBlock> optionalInfoBlock = infoBlockRepository.findById(id);
        if (optionalInfoBlock.isPresent()) {
            InfoBlock infoBlock = optionalInfoBlock.get();
            infoBlock.setTitle(infoBlockDetails.getTitle());
            infoBlock.setContent(infoBlockDetails.getContent());
            return infoBlockRepository.save(infoBlock);
        } else {
            return null;
        }
    }

    public void deleteInfoBlock(Long id) {
        infoBlockRepository.deleteById(id);
    }
}
