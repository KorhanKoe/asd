package com.website.website;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/infoblock")

public class InfoBlockController {

    @Autowired
    private InfoBlockService infoBlockService;

    @GetMapping
    public List<InfoBlock> getAllInfoBlocks() {
        return infoBlockService.getAllInfoBlocks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InfoBlock> getInfoBlockById(@PathVariable Long id) {
        InfoBlock infoBlock = infoBlockService.getInfoBlockById(id).orElse(null);
        if (infoBlock!=null) {
            return ResponseEntity.ok(infoBlock);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public InfoBlock createInfoBlock(@RequestBody InfoBlock infoBlock) {
        return infoBlockService.createOrUpdateInfoBlock(infoBlock);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InfoBlock> updateInfoBlock(@PathVariable Long id, @RequestBody InfoBlock infoBlockDetails) {
        InfoBlock infoBlock = infoBlockService.getInfoBlockById(id).orElse(null);
        if (infoBlock != null) {
            infoBlock.setTitle(infoBlockDetails.getTitle());
            infoBlock.setContent(infoBlockDetails.getContent());
            InfoBlock updateInfoBlock = infoBlockService.createOrUpdateInfoBlock(infoBlock);
            return ResponseEntity.ok(updateInfoBlock);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInfoBlock(@PathVariable Long id) {
        infoBlockService.deleteInfoBlock(id);
        return ResponseEntity.noContent().build();
    }
}
